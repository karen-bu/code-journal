const $photoURL = document.querySelector('#photo-url');
if (!$photoURL) throw new Error('$photoURL does not exist!');

const $image = document.querySelector('img') as HTMLImageElement;
if (!$image) throw new Error('$image does not exist!');

// Reference image URLs to test code
// https://64.media.tumblr.com/704b217831d890fee3e84c5f28646889/dfeae80de15b3de7-08/s1280x1920/78f8d964fcff80916d40ea5e6121afbc5562f283.jpg
// https://64.media.tumblr.com/1b54e834bda85fc26bc6a018e5f9b444/a3ba198d6b60f48d-cd/s1280x1920/4b031174a9cb50953918afe5ca37e1143ff5ee80.jpg

$photoURL.addEventListener('input', (event: Event) => {
  const inputURL = event.target as HTMLInputElement;
  $image.src = inputURL.value;
});

// const $entryForm = document.querySelector('#entry-form')
//   .elements as HTMLFormControlsCollection;
// if (!$entryForm) throw new Error('$entryForm does not exist!');

// const $entryFormInputs = $entryForm.elements;
// console.log($entryForm.elements);

// $entryForm.addEventListener('submit', (event: Event) => {
//   event.preventDefault();
//   console.log($entryForm.elements);
// });

// const formSubmit = event.target;

// console.log('event target:', event.target);
// console.log('button clicked!', formSubmit);
// const formInput = event.input.value;
