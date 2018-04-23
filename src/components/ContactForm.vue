<template>
  <form class='Form'>
    <div class='Form-fieldset'>
      <label for='from' class='Form-label'>
        Your Email Address
      </label>
      <input type='text' name='from' class='Form-input' />
    </div>
    <div class='Form-fieldset'>
      <label for='subject' class='Form-label'>
        Subject
      </label>
      <input type='text' name='subject' class='Form-input' />
    </div>
    <div class='Form-fieldset'>
      <label for='message' class='Form-label'>
        Message
      </label>
      <textarea name='message' class='Form-textarea' />
    </div>
    <div class='Form-fieldset'>
      <button class='Button' type='submit'>Send!</button>
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

.Form {
  display: flex;
  flex-direction: column;

  &-fieldset {
    display: flex;
    flex-direction: column;
    margin: $base-spacing 0 0;
    justify-content: space-between;
  }

  &-label {
    font-size: $small-font-size;
    padding-bottom: $small-spacing;
  }

  &-input, &-textarea {
    width: $input-width;
    height: $input-height;
    border: 1px solid $light-gray;
    border-radius: $base-radius
  }

  &-textarea {
    height: $textarea-height;
    resize: none;
  }

  .Button {
    align-self: flex-end;
  }
}
</style>