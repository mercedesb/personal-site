<template>
  <form class='Contact'>
    <div class='Contact-fieldset'>
      <label for='from' class='Contact-label'>
        Your Email Address
      </label>
      <input type='text' name='from' class='Contact-input' />
    </div>
    <div class='Contact-fieldset'>
      <label for='subject' class='Contact-label'>
        Subject
      </label>
      <input type='text' name='subject' class='Contact-input' />
    </div>
    <div class='Contact-fieldset'>
      <label for='message' class='Contact-label'>
        Message
      </label>
      <textarea name='message' class='Contact-textarea' />
    </div>
  </form>
</template>

<script>
export default {
}
</script>

<style lang="scss">
$input-width: 600px;
$input-height: $large-spacing;
$textarea-height: $large-spacing * 5;

.Contact {
  display: flex;
  flex-direction: column;
}
.Contact-fieldset {
  display: flex;
  flex-direction: column;
  margin: $base-spacing 0 0;
  justify-content: space-between;
}

.Contact-label {
  font-size: $small-font-size;
  padding-bottom: $small-spacing;
}

.Contact-input {
  width: $input-width;
  height: $input-height;
  border: 1px solid lighten($gray, 40%);
}

.Contact-textarea {
  width: $input-width;
  height: $textarea-height;
  border: 1px solid lighten($gray, 40%);
  resize: none;
}
</style>