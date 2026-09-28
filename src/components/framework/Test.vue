<template>
  <div>
    <slot />
    <!-- This ensures word replacement works across all routes/pages -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      wordReplacements: {
        "மேலாண்மை": "நிர்வாகம்", //Management
        "திரு. கே. ரவீந்திர பத்மபிரியா": "திரு. கே. ரவீந்திர பத்மபிரிய ", //Mr. K Ravindra Pathmapriya
        "தலைமை இயக்குநர்": "பணிப்பாளர் நாயகம் ", //Director General
        "துறை    ": "திணைக்களம்", //Department of Information Technology Management
        "கூடுதல்": "மேலதிக", //Additional
        "பார்வை": " தூரநோக்கு", //vision
        "செய்யுங்கள்": "சைபர் பாதுகாப்பை உறுதி செய்தல் ",
        "ஷிராந்தா": "ஷிராந்த ", //Shirantha
        "பண்டிதா": "பண்டித", //panditha
        "சந்திரசேகரா": "சந்திரசேகர", //chandrasekara
        "":"",
      },
    };
  },
  mounted() {
    setInterval(this.replaceWordsAfterTranslation, 1000); // Runs every second
  },
  methods: {
    replaceWordsAfterTranslation() {
      document.querySelectorAll("*").forEach((element) => {
        if (element.children.length === 0) {
          // Avoid modifying container elements
          let content = element.innerHTML;
          Object.keys(this.wordReplacements).forEach((originalWord) => {
            let replacementWord = this.wordReplacements[originalWord];
            let regex = new RegExp(originalWord, "g"); // Case-sensitive replacement
            content = content.replace(regex, replacementWord);
          });
          element.innerHTML = content;
        }
      });
    },
  },
};
</script>
