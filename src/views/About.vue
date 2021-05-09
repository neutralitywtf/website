<template>
  <v-container class="home pa-0 diagonal" fluid fill-height>
    <v-row no-gutters align="center" justify="center">
      <section class="pa-10 about-text">
        <TextSection
          title="WTF, Neutrality?"
          subtitle="Yes. That is - no. Well, maybe. Definitely maybe."
        >
          <p>Society has instilled gender norms, of the type we tend to miss, attributing characteristics based on gender perceptions. Gender norms can manifest by broad generalizations about a certain gender, reducing gender into binary terminology, or using certain tone and language when speaking about one gender versus the other.</p>
          <p>Gender roles and society's gender norms are harmful to all genders, binary and non-binary. So why do we do them?</p>
          <p>Sometimes, we reject the notion these language influences exists (despite research to show they do). Sometimes, we just don't notice.</p>
        </TextSection>

        <TextSection
          title="This site exists to make us notice"
          subtitle="We can only talk about what we notice."
        >
          <p><span class='neutralitywtf-about-text-logo'>Neutrality:WTF</span> exists to demonstrate what happens to our language online when we switch genders around. Is there a clear difference between how we relate to men versus how we talk about women? Do we notice when we fall into pitfalls that encourage one gender at the expense of another? Can we even see when an article we think is 'complimentary' is actually anything but?</p>
          <p class='neutralitywtf-emphasis'><span class='neutralitywtf-about-text-logo'>Neutrality:WTF</span> challenges you to try and notice.</p>
        </TextSection>

        <TextSection
          title="Gender isn't binary"
          subtitle="Gender is a spectrum, but gendered language tends to be binary."
        >
          <p><span class='neutralitywtf-about-text-logo'>Neutrality:WTF</span> exists to demonstrate what happens to our language online when we switch genders around. Is there a clear difference between how we relate to men versus how we talk about women? Do we notice when we fall into pitfalls that encourage one gender at the expense of another? Can we even see when an article we think is 'complimentary' is actually anything but?</p>
          <p class='neutralitywtf-emphasis'><span class='neutralitywtf-about-text-logo'>Neutrality:WTF</span> challenges you to try and notice.</p>
        </TextSection>

        <TextSection
          title="Context matters"
          subtitle=""
        >
          <p>While the test of switching terminology around can expose biases, it is really not supposed to stand on its own. Text alone, lacking context, is proof of nothing.</p>
          <p class='neutralitywtf-emphasis'>More than anything, <span class='neutralitywtf-about-text-logo'>Neutrality:WTF</span> should be a conversation starter. Not a discussion ending hammer. Context matters.</p>
        </TextSection>

        <TextSection
          title="Technical stuff"
          subtitle=""
        >
          <p><span class='neutralitywtf-about-text-logo'>Neutrality:WTF</span> uses the <a href="https://github.com/https://github.com/mooeypoo/dom-word-replacer">Dom Word Replacer</a> npm library, available on GitHub. The library uses dictionaries to do direct replacements of words in HTML documents based on dictionary definitions.</p>
        </TextSection>

        <!-- <h2>List of replacements</h2>
        <p>The list of one-to-one replacements is defined in a <a href="https://github.com/neutralitywtf/website/blob/main/src/data/binarygender.json">json dictionary you can contribute to</a>. Below is a visual representation of the replacement words:
        <DictionaryTable /> -->
        <TextSection
          title="Technical limitations"
          subtitle="One-to-one replacements are far from perfect."
        >
          <p>Language is hard and complicated, but it had to be oversimplified to allow the system to replace terminology around. There are a few known limitations that currently exist with the system as it is built right now:
          <ul>
            <li><span class='neutralitywtf-emphasis'>Binary gender is a problem</span><br />Research shows that the concept of gender is far from being binary, so the fact <span class='neutralitywtf-about-text-logo'>Neutrality:WTF</span> uses binary gender is quite a limitation. However, <span class='neutralitywtf-about-text-logo'>Neutrality:WTF</span> uses this concept ot make a point <strong>about</strong> binary expectations specifically. In the future, it may expand to make further points about the broader aspects of gender and personal identities, and the societal implications that accompany them.</li>
            <li><span class='neutralitywtf-emphasis'>Manual word-lists limit the translation</span><br />The dictionaries are currently handwrittern, and not very well. This is being improved (feel free <a href="https://github.com/neutralitywtf/website/blob/main/src/data/binarygender.json">to help</a>!) but it does limit the language used.</li>
            <li><span class='neutralitywtf-emphasis'>Straightforward word replacement is inherently flawed</span><br />When the dictionaries are defined, they search for words that are defined as the same "type" as the words in the parallel dictionary. However, some words are repeated in multiple types and the system can't recognize which to switch to.<br/>An example of this is the word 'her' that can be replaced with either 'him' ('talk to her' becomes 'talk to him') or with the word 'his' ('her house' becomes 'his house'). The system as it is built right now is plain; it looks for the word and conducts a plain, straightforward replacement, so the ambiguity can result in "him" and "his" appearing in error.</li>
          </ul>
          </p>
        </TextSection>

        <TextSection
          title="Contribute"
          subtitle=""
        >
          <p>This tool is still being developed; it's in beta phase, and has a lot of potential. If you catch any bugs or have any suggestions, <a href="https://github.com/neutralitywtf/website">please check out the github page</a>.</p>
        </TextSection>

        <TextSection
          title="Contact"
          subtitle=""
        >
          <p class='neutralitywtf-emphasis'>For questions and inquiries, please use<br/>contact [at] neutrality.wtf</p>
        </TextSection>

      </section>
    </v-row>
  </v-container>
</template>

<script>
// import DictionaryTable from '../components/DictionaryTable'
import TextSection from '../components/TextSection'
export default {
  name: 'About',
  components: { TextSection },
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
.v-card__title {
  word-break: break-word !important;
}
</style>
