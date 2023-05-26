import { useEffect } from "react";

function executeRecaptcha() {
  window.grecaptcha.ready(function () {
    window.grecaptcha
      .execute("6Lfl3D8mAAAAANqm-CKEGTlDMPVUYF1Swt_xickj", { action: "your_action_name" })
      .then(function (token) {
        // Use the 'token' value in your backend to verify the reCAPTCHA response
        // You can send this token to your server for verification
        console.log(token);
      });
  });
}

export function useRecaptcha() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?render=6Lfl3D8mAAAAANqm-CKEGTlDMPVUYF1Swt_xickj";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Clean up the dynamically added script when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return { executeRecaptcha };
}
