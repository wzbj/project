<template>
    <div class="input_group">
        <label :for="name">{{label}}:</label>
        <input 
          size="medium"
          :type="type"
          :value="value"
          :placeholder="placeholder"
          :name='name'
          @input="$emit('input', $event.target.value)" />
    </div>
</template>
<script>
export default {
  name: "input_group",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: String,
    placeholder: String,
    name: String,
    label: String
  }
};
</script>

<style scoped>
.input_group {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  /* padding: 10px 0; */
  line-height: 60px;
  padding-left: 15px;
  padding-right: 15px;
}
.input_group label {
  display: block;
  line-height: 20px;
}
.input_group input {
  display: block;
  width: 100%;
  font-size: 20px;
  /* border: none; */
  outline: none;
}
</style>
