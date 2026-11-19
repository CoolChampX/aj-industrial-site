const enquiryForm = document.querySelector('#enquiry-form');
const formNote = document.querySelector('#form-note');

if (enquiryForm) {
  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    enquiryForm.classList.add('was-validated');

    if (!enquiryForm.reportValidity()) return;

    const formData = new FormData(enquiryForm);
    const fullName = [formData.get('firstName'), formData.get('surname')].join(' ').trim();
    const composeUrl = new URL('https://mail.google.com/mail/');
    composeUrl.searchParams.set('view', 'cm');
    composeUrl.searchParams.set('fs', '1');
    composeUrl.searchParams.set('to', 'ajindustrialpvtltd@gmail.com');
    composeUrl.searchParams.set('su', 'Industrial enquiry from ' + fullName);
    composeUrl.searchParams.set(
      'body',
      [
        'First name: ' + formData.get('firstName'),
        'Surname: ' + formData.get('surname'),
        'Email: ' + formData.get('email'),
        '',
        'Message:',
        formData.get('message'),
      ].join('\n'),
    );

    formNote.textContent = 'Opening Gmail with your enquiry. Review it and press Send.';
    window.open(composeUrl.toString(), '_blank', 'noopener,noreferrer');
  });
}
