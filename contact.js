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
    const mailtoUrl = new URL('mailto:ajindustrialpvtltd@gmail.com');
    mailtoUrl.searchParams.set('subject', subject);
    mailtoUrl.searchParams.set('body', body);

    formNote.textContent = 'Opening your email app with the enquiry. Review it and press Send.';
    window.location.href = mailtoUrl.toString();
  });
}
