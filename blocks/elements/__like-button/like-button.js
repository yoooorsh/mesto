let likeButton = document.querySelectorAll('.elemеnts__like-button');

likeButton.addEventListener('click', function() {
  likeButton.classList.toggle('elements__like-button_active');
})