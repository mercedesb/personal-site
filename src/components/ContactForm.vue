<template>
  <div>
    <div v-if="success" class='Form-success'>
      Thank you for your message! I'll respond as soon as I can. Until then, feel free to connect with me on any of the social media platforms below.
    </div>
    <form v-else class='Form PageContent' v-on:submit.prevent="onSubmit">
      <transition name="fade" mode="out-in">
        <div class='Form-error'>
          {{error}}
        </div>
      </transition>
      <div class='Form-fieldset'>
        <label for='from' class='Form-label'>
          Your Email Address
        </label>
        <input v-model="from" type='text' name='from' class='Form-input' required />
      </div>
      <div class='Form-fieldset'>
        <label for='subject' class='Form-label'>
          Subject
        </label>
        <input v-model="subject" type='text' name='subject' class='Form-input' required />
      </div>
      <div class='Form-fieldset'>
        <label for='text' class='Form-label'>
          Message Text
        </label>
        <textarea v-model="text" name='text' class='Form-textarea' required/>
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
  data () {
    return {
      from: '',
      subject: '',
      text: '',
      success: false,
      error: ''
    }
  },
  methods: {
    onSubmit () {
      const promise = axios.post(process.env.MAILER_API, {
        from: this.from,
        subject: this.subject,
        text: this.text
      })

      promise.then((response) => {
        this.success = response.data.success
        this.error = response.data.error
      })
        .catch(e => {
          if (process.env.NODE_ENV === 'development') {
            console.log(e)
          }
          if (e.response && e.response.data) {
            this.error = e.response.data.error
          }
        })

      return promise
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/styles/variables.scss';

  $form-width: 900px;
  $input-height: $large-spacing;
  $textarea-height: $large-spacing * 5;

  .Form {
    /*max-width: $form-width;*/
    width: 100%;
    margin: 0 $base-spacing;

    &-fieldset {
      flex-direction: column;
      margin: $base-spacing 0 0;
      justify-content: space-between;
    }

    &-label {
      font-size: $small-font-size;
      padding-bottom: $small-spacing;
    }

    &-input, &-textarea {
      min-width: 300px;
      max-width: $form-width;
      width: 100%;
      height: $input-height;
      border: 1px solid $light-gray;
      border-radius: $base-radius
    }

    &-textarea {
      height: $textarea-height;
      resize: none;
    }

    .Button {
      float: right;
    }

    &-success {
      font-style: italic;
      margin-top: $large-spacing;
    }

    &-error {
      color: red;
      font-style: italic;
      font-size: 16px;
    }
  }
</style>
