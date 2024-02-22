import * as app from "./utils/custom-methods";
import ShowHideRadioCheckboxes from "./utils/show-hide-radio-checkboxes";
import DonationAmount from "./events/donation-amount";
import DonationFrequency from "./events/donation-frequency";
import EnForm from "./events/en-form";
import LiveVariables from "./utils/live-variables";
import ProcessingFees from "./events/processing-fees";
import Modal from "./utils/modal";
import IE from "./utils/ie";
import VGS from "./utils/vgs";

// IE Warning
const ie = new IE();

import sendIframeHeight from "./utils/iframe";

export const amount = new DonationAmount(
  "transaction.donationAmt",
  "transaction.donationAmt.other"
);
export const frequency = new DonationFrequency("transaction.recurrpay");
export const form = EnForm.getInstance();

// Processing Fees Event
export const fees = new ProcessingFees();

export const run = (opts: Object) => {
  const options = {
    ...{
      backgroundImage: "auto",
      submitLabel: "Donate",
    },
    ...opts,
  };
  // The entire App
  app.setBackgroundImages(options.backgroundImage);

  app.inputPlaceholder();
  app.watchInmemField();
  app.watchRecurrpayField();
  app.watchGiveBySelectField();
  app.watchLegacyGiveBySelectField();
  app.SetEnFieldOtherAmountRadioStepValue();
  app.simpleUnsubscribe();

  app.contactDetailLabels();
  app.easyEdit();
  app.enInput.init();

  new ShowHideRadioCheckboxes("transaction.giveBySelect", "giveBySelect-");
  new ShowHideRadioCheckboxes("supporter.questions.180165", "giveBySelect-");
  new ShowHideRadioCheckboxes("transaction.inmem", "inmem-");
  new ShowHideRadioCheckboxes("transaction.recurrpay", "recurrpay-");

  new VGS();

  app.debugBar();

  // Event Listener Examples
  amount.onAmountChange.subscribe((s) => console.log(`Live Amount: ${s}`));
  frequency.onFrequencyChange.subscribe((s) =>
    console.log(`Live Frequency: ${s}`)
  );
  form.onSubmit.subscribe((s) => console.log(`Submit: ${s}`));
  form.onError.subscribe((s) => console.log(`Error: ${s}`));
  form.onValidate.subscribe((s) => console.log(`Validate: ${s}`));

  window.enOnSubmit = () => {
    form.submit = true;
    form.submitPromise = false;
    form.dispatchSubmit();
    if (!form.submit) return false;
    if (form.submitPromise) return form.submitPromise;
    // If all validation passes, we'll watch for Digital Wallets Errors, which
    // will not reload the page (thanks EN), so we will enable the submit button if
    // an error is programmatically thrown by the Digital Wallets
    return true;
  };
  window.enOnError = () => {
    form.dispatchError();
  };
  window.enOnValidate = () => {
    form.validate = true;
    form.validatePromise = false;
    form.dispatchValidate();
    if (!form.validate) return false;
    if (form.validatePromise) return form.validatePromise;
    return true;
  };

  // Iframe Code Start
  const inIframe = () => {
    try {
      return (window as any).self !== (window as any).top;
    } catch (e) {
      return true;
    }
  };
  if (inIframe()) {
    const shouldScroll = () => {
      // If you find a error, scroll
      if (document.querySelector(".en__errorHeader")) {
        return true;
      }
      // Try to match the iframe referrer URL by testing valid EN Page URLs
      let referrer = document.referrer;
      let enURLPattern = new RegExp(/^(.*)\/(page)\/(\d+.*)/);

      // Scroll if the Regex matches, don't scroll otherwise
      return enURLPattern.test(referrer);
    };
    (window as any).onload = () => {
      sendIframeHeight();
      // Scroll to top of iFrame
      (window as any).parent.postMessage(
        {
          scroll: shouldScroll(),
        },
        "*"
      );
      document.addEventListener("click", (e: Event) => {
        setTimeout(() => {
          sendIframeHeight();
        }, 100);
      });
    };
    (window as any).onresize = () => sendIframeHeight();
    // Change the layout class to embedded
    const gridElement =
      document.getElementById("engrid") || (document.body as HTMLElement);
    // @TODO We need to write a better way of stripping layout classes
    gridElement.classList.add("layout-embedded");
    gridElement.classList.remove("layout-centerleft1col");
    gridElement.classList.remove("layout-centercenter1col");
    gridElement.classList.remove("layout-centerright1col");
    gridElement.classList.remove("layout-centercenter1col-wide");
  }
  // Iframe Code End

  // Live Variables
  new LiveVariables(options.submitLabel);

  // Modal
  const modal = new Modal();
  modal.debug = true; // Comment it out to disable debug

  // On the end of the script, after all subscribers defined, let's load the current value
  amount.load();
  frequency.load();
};
