<template>
  <div>
    <div v-if="success">
      Success!
    </div>
    <form v-if="!success" class='Form' v-on:submit.prevent="onSubmit">
      <div class='Form-error'>
        {{error}}
      </div>
      <div class='Form-fieldset'>
        <label for='from' class='Form-label'>
          Your Email Address
        </label>
        <input v-model="from" type='text' name='from' class='Form-input' />
      </div>
      <div class='Form-fieldset'>
        <label for='subject' class='Form-label'>
          Subject
        </label>
        <input v-model="subject" type='text' name='subject' class='Form-input' />
      </div>
      <div class='Form-fieldset'>
        <label for='text' class='Form-label'>
          Message
        </label>
        <textarea v-model="text" name='text' class='Form-textarea' />
      </div>
      <div class='Form-fieldset'>
        <button class='Button' type='submit'>Send!</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      from: '',
      subject: '',
      text: '',
      success: false,
      error: ''
    }
  },
  methods: {
    onSubmit() {
      axios.post(process.env.MAILER_API, {
        from: this.from,
        subject: this.subject,
        text: this.text
      })
      .then((response) => {
        debugger
        this.success = response.data.success
        this.error = response.data.error
      })
      .catch(e => {
        this.error = e
      })
    }
  }
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