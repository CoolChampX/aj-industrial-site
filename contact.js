const enquiryForm = document.querySelector('#enquiry-form');
const formNote = document.querySelector('#form-note');

if (enquiryForm) {
  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    enquiryForm.classList.add('was-validated');

    if (!enquiryForm.reportValidity()) return;

    const formData = new FormData(enquiryForm);
    const fullName = [formData.get('firstName'), formData.get('surname')].join(' ').trim();
    const subject = 'Industrial enquiry from ' + fullName;
    const body = [
        'First name: ' + formData.get('firstName'),
        'Surname: ' + formData.get('surname'),
        'Email: ' + formData.get('email'),
        '',
        'Message:',
        formData.get('message'),
      ].join('\n');
    const recipient = 'ajindustrialpvtltd@gmail.com';
    const params = new URLSearchParams({ subject, body }).toString();
    const mailtoUrl = `mailto:${recipient}?${params}`;
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&${params}`;
    const userAgent = navigator.userAgent || '';
    const isAndroid = /Android/i.test(userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent)
      || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    formNote.textContent = 'Opening your email app with the enquiry. Review it and press Send.';

    if (isAndroid) {
      // Explicitly target Gmail on Android, with mailto as a fallback.
      const intentUrl = `intent://${recipient}?${params}#Intent;scheme=mailto;package=com.google.android.gm;end`;
      window.location.href = intentUrl;
      window.setTimeout(() => {
        window.location.href = gmailComposeUrl;
      }, 1200);
      return;
    }

    if (isIOS) {
      // Gmail for iOS registers this URL scheme. If it is unavailable, try
      // the system's default email app through mailto.
      const gmailUrl = `googlegmail://co?to=${encodeURIComponent(recipient)}&${params}`;
      let appOpened = false;
      const markAppOpened = () => { appOpened = true; };
      document.addEventListener('visibilitychange', markAppOpened, { once: true });
      window.location.href = gmailUrl;
      window.setTimeout(() => {
        document.removeEventListener('visibilitychange', markAppOpened);
        if (!appOpened) window.location.href = gmailComposeUrl;
      }, 1200);
      return;
    }

    window.location.href = mailtoUrl;
  });
}
