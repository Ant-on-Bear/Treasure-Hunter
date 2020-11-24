<template>
  <div class="pa-0 ma-0 search-game-container">
    <v-toolbar prominent height="100px" class="pa-0" color="#031a22">
      <v-row no-gutters class="ma-0 pa-0">
        <v-col cols="12" sm="4" class="pa-1">
          <v-card
            class="pa-2 top-tiles"
            outlined
            tile
            color="#768a91"
            height="85px"
          >
            <v-btn :disabled="isButtonDisabled" @click="letsPatch"
              >tester</v-btn
            >
            {{ wrongAttempts }}
            <v-btn @click="testMethod()">undo</v-btn>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="pa-1">
          <v-card
            class="pa-0 pl-2 top-tiles"
            outlined
            tile
            color="#768a91"
            height="85px"
          >
            <p class="text-overline pa-0 ma-0">
              Wrong guesses(3 crosses and your game will be freezed for 2 hours)
            </p>
            <v-row>
              <v-col cols="4">
                <v-img
                  v-if="wrongAttempts >= 1"
                  class="mx-auto pa-0 mt-n2"
                  height="50px"
                  width="50px"
                  src="../../assets/wrong.png"
                />
              </v-col>
              <v-col cols="4">
                <v-img
                  v-if="wrongAttempts >= 2"
                  class="mx-auto pa-0 mt-n2"
                  height="50px"
                  width="50px"
                  src="../../assets/wrong.png"
                />
              </v-col>
              <v-col cols="4">
                <v-img
                  v-if="wrongAttempts >= 3"
                  class="mx-auto pa-0 mt-n2"
                  height="50px"
                  width="50px"
                  src="../../assets/wrong.png"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="pa-1">
          <v-card
            class="pa-2 top-tiles"
            outlined
            tile
            color="#768a91"
            height="85px"
          >
            <v-row class="pa-0">
              <v-col cols="5">
                <p
                  class="text-h4 font-weight-black blue-grey--text text--darken-4 text-right"
                >
                  CREDITS:
                </p>
              </v-col>
              <v-col cols="2">
                <p
                  class="text-h4 font-weight-black blue-grey--text text--darken-4"
                >
                  {{ getUserCredits }}
                </p>
              </v-col>
              <v-col cols="4" class="pa-2">
                <v-menu bottom offset-y nudge-left="533">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="ma-0 pa-4"
                      v-bind="attrs"
                      v-on="on"
                      x-large
                      color="success"
                      dark
                    >
                      REQUEST CREDIT
                    </v-btn>
                  </template>
                  <v-card
                    class="pl-9 pt-3 credit-card pa-12"
                    min-width="517"
                    min-height="410"
                    elevation="10"
                  >
                    <v-card-subtitle class="overline mb-4 white--text pl-2">
                      Hi I am...
                    </v-card-subtitle>
                    <v-card-title class="pt-0 mt-n2 ml-4 white--text">
                      CREDIT CARL
                    </v-card-title>
                    <v-card-text class="white--text pr-10 mr-12 pl-7"
                      >So you are a bit stuck hey, and need some credit to get
                      you moving again,<br />
                      well you came to the right guy.<br /><br />
                      Just a few T and C's, we only do EFT, why you may ask,
                      because I am a <br />
                      simple 8-5 working guy and do not earn enough to pay some
                      3rd-party-<br />app-big-player to handle the transactions.
                      So I give it to Bob the Bank Man. <br />
                      But Bob the Bank-man, he's a bit...slow. So when you
                      purchase some credit <br />here please be so kind to email
                      me the proof of payment (1 Credit = R2,<br />
                      eg. if you send a proof of payment for R20, you'll get 10
                      Credits) at <br />creditcarl@gmail.com, with your
                      username. And as soon as I get the nod from<br />
                      him, I'll update your credits. * Credit Carl Tip #1: Don't
                      buy when you need it, buy <br />enough to keep you going
                      for a while, the less you wait for Bob the better, but<br />
                      choose wisely, if you finish treasure hunter and you've
                      got spare credits,<br />
                      it will be gone with the game.
                    </v-card-text>

                    <v-card-actions> </v-card-actions>
                  </v-card>
                </v-menu>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-toolbar>

    <v-row class="ma-0">
      <v-col cols="9" sm="9" class="pa-1">
        <v-card class=" pa-1 black" outlined tile>
          <v-img src="../../assets/FindNumbers.png">
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex align-content-center flex-column transition-slow-in-slow-out v-card--reveal overlay-one display-3 white--text"
                :class="{
                  'overlay-one': tempStorageRandomNumber == 4,
                  'overlay-two': tempStorageRandomNumber == 3,
                  'overlay-three': tempStorageRandomNumber == 12,
                  'overlay-twelve': tempStorageRandomNumber == 8,
                  'overlay-five': tempStorageRandomNumber == 6,
                  'overlay-thirteen': tempStorageRandomNumber == 17,
                  'overlay-seven': tempStorageRandomNumber == 100,
                  'overlay-eight': tempStorageRandomNumber == 7,
                  'overlay-nine': tempStorageRandomNumber == 9,
                  'overlay-ten': tempStorageRandomNumber == 66,
                  'overlay-eleven': tempStorageRandomNumber == 33
                }"
                style="height: 100%;"
              >
                <p class="text-h6">NUMBER REVEALED!</p>
                <p class="text-caption">
                  This number was automatically added to your list of numbers
                  found
                </p>
                <p>
                  <v-btn @click="continueWithGame">
                    CONTINUE WITH GAME
                  </v-btn>
                </p>
              </div>
            </v-expand-transition>
          </v-img>
        </v-card>
        <v-row class="pa-1 ml-0" style="background-color:#031a22;">
          <v-col
            class="py-0"
            v-for="(number, i) in showInputFields + 1"
            :key="i"
            cols="1"
            sm="1"
          >
            <template v-if="numberCorrect >= number - 1">
              <v-row
                ><v-col class="pa-0 ma-0 text-center" cols="12"
                  ><v-btn
                    @click="inputNumber[number - 1].number++"
                    small
                    color="black"
                    depressed
                    width="100%"
                    dark
                    tile
                    :disabled="
                      inputNumber[number - 1].number > 100 ||
                        numberCorrect > number - 1
                    "
                    ><i class="fas fa-sort-up"></i></v-btn></v-col
              ></v-row>
              <v-row
                ><v-col class="pa-0 pl-1" cols="12"
                  ><v-text-field
                    single-line
                    solo
                    background-color="black"
                    dark
                    v-model="inputNumber[number - 1].number"
                    :disabled="numberCorrect > number - 1"
                    class="centered-input"
                  ></v-text-field></v-col
              ></v-row>
              <v-row class="pa-0 mt-n2"
                ><v-col class="pa-0 ma-0 text-center" cols="12"
                  ><v-btn
                    @click="inputNumber[number - 1].number--"
                    color="black"
                    depressed
                    width="100%"
                    dark
                    tile
                    :disabled="
                      inputNumber[number - 1].number <= 0 ||
                        numberCorrect > number - 1
                    "
                    ><i class="fas fa-sort-down"></i></v-btn></v-col
              ></v-row>
            </template>
          </v-col>

          <v-col class="px-0 pl-2 pt-3 pb-5" cols="1" sm="1">
            <v-btn
              v-if="numberCorrect < 11"
              color="light-green accent-4"
              height="100%"
              @click="isAnswerCorrect(numberCorrect)"
              class="raised-button"
            >
              <span>Check<br />your<br />answer</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="3" sm="3" class="pa-1">
        <v-row style="height:100%;">
          <v-col cols="12" sm="12" class="pa-0">
            <v-card
              class="d-flex flex-wrap mb-6"
              outlined
              flat
              height="100%"
              tile
              color="#031a22"
            >
              <v-card
                v-for="(clue, i) in clueArray"
                :key="i"
                class=" ma-1 align-self-stretch center-align"
                outlined
                tile
                width="45%"
                color="#031a22"
              >
                <v-card-actions class="justify-center">
                  <v-btn
                    x-large
                    color="success"
                    fab
                    dark
                    class="mx-auto"
                    @click="activeClue(i + 1)"
                    :disabled="
                      clue.status == 'disabled' || clue.status == 'used'
                    "
                    :text="clue.status == 'used'"
                  >
                    <v-icon
                      v-if="
                        clue.status == 'active' || clue.status == 'disabled'
                      "
                      x-large
                      class="text-h2"
                      color="#fff"
                      >mdi-progress-question</v-icon
                    >

                    <v-icon v-else x-large class="text-h2" color="#0296c9"
                      >mdi-check</v-icon
                    >
                  </v-btn>
                </v-card-actions>
                <v-card-text
                  v-if="clue.status == 'active' || clue.status == 'disabled'"
                  class="text-center cyan--text text--lighten-5"
                >
                  <span
                    v-if="clue.status == 'active' || clue.status == 'disabled'"
                    >{{ clue.text }} {{ i + 1 }} Credit</span
                  >
                </v-card-text>
                <v-card-text
                  v-else
                  class="mt-n9 text-center blue-grey--text text--darken-3 font-weight-black"
                >
                  Used
                </v-card-text>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Your Hint-Card!
        </v-card-title>

        <v-card-text v-if="getUserCredits > 0 && activeClueProp < 5">
          {{ tempStorageRandomClue }}
        </v-card-text>
        <v-card-text v-else-if="getUserCredits > 0 && activeClueProp > 4">
          <v-row>
            <v-col cols="6">
              <p class="text-h5 text-center font-weight-black">
                Hidden Number:
              </p>
              <p
                class="grey lighten-2 pa-5 text-h5 text-center font-weight-black"
              >
                <span v-if="tempStorageRandomNumber > 0">
                  {{ tempStorageRandomNumber }}
                </span>
              </p>
            </v-col>
            <v-col cols="6">
              <v-btn
                @click="randomHiddenNumberAvailable()"
                color="success"
                x-large
                height="100%"
                :disabled="tempStorageRandomNumber != 0"
              >
                You are about to<br />
                use credits to<br />
                reveal a number.<br />Are you sure?
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text v-else>
          Sorry you do not have enough credits
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="activeClueProp > 4 && tempStorageRandomNumber == 0"
            color="primary"
            text
            @click="dialog = false"
          >
            cancel
          </v-btn>
          <v-btn color="primary" text @click="decrementCredits(activeClueProp)">
            <span> got it!</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogTwo"
      overlay-color="black"
      overlay-opacity="0.9"
      persistent
      width="500"
    >
      <v-card>
        <v-card-text>
          After you dotted down all the numbers you found in the room, you
          remember the padlock on the door and wonder if your sequence of
          numbers might be the combination to the lock, but to your suprise you
          see there's only 3 slots. Now completely hopeless you stare in front
          of you, and notice a small engraving above the lock, it reads "Find
          the numbers one by one, tally them and you close to done, seperate the
          total to make it unbound, mix the numbers and move them around, get
          the right combination, and move on to your next destination"
          <v-card class="d-flex flex-row my-4" flat tile>
            <v-card
              outlined
              flat
              tile
              all
              width="50px"
              height="40px"
              v-for="(number, key) in inputNumber"
              :key="key"
            >
              <p class="text-center pa-2">{{ number.number }}</p>
            </v-card>
          </v-card>
          You take a long deep stare at the numbers, the gears start moving in
          that old head yours, and you begin with the next part of this terrible
          puzzle...
          <v-row>
            <v-col v-for="(number, key) in 3" :key="key">
              <v-row flat tile class="mb-n6">
                <v-col flat tile>
                  <v-btn
                    flat
                    depressed
                    text
                    tile
                    width="100%"
                    @click="
                      modalNumber[key].number < 9
                        ? modalNumber[key].number++
                        : modalNumber[key].number
                    "
                  >
                    <i class="fas fa-sort-up"></i>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row flat tile>
                <v-col flat tile>
                  <v-card
                    outlined
                    class="text-center text-h4 py-1"
                    height="50px"
                  >
                    {{ modalNumber[key].number }}
                  </v-card>
                </v-col>
              </v-row>
              <v-row flat tile class="mt-n6">
                <v-col flat tile>
                  <v-btn
                    flat
                    depressed
                    text
                    tile
                    width="100%"
                    @click="
                      modalNumber[key].number > 0
                        ? modalNumber[key].number--
                        : modalNumber[key].number
                    "
                  >
                    <i class="fas fa-sort-down"></i>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-btn color="success" width="100%" @click="validateSlot"
              >OPEN GATE</v-btn
            >
          </v-col>
        </v-row>
        <v-row v-if="displayMessage != ''">
          <v-col cols="12">
            <span> {{ displayMessage }} </span>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            ATTEMPTS LEFT :
            <span v-if="wrongAttempts == 0">3</span>
            <span v-else-if="wrongAttempts == 1">2</span>
            <span v-else-if="wrongAttempts == 2">1</span>
          </v-col>
          <v-col cols="12" v-if="displayMessage == 'UERIKA!!! ..GATE OPENS'">
            <v-btn color="success" @click="finishGame">PROCEED</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isButtonDisabled"
      overlay-color="black"
      overlay-opacity="0.9"
      persistent
      width="500"
    >
      <v-card color="black">
        <v-card-text>
          <p class="text-center text-h6 pt-3 red--text ">
            Too many wrong guesses, you are in timeout for:
          </p>
          <p
            id="demo"
            class="text-center text-h4 py-1 red--text font-weight-black"
          ></p>
        </v-card-text>
      </v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      test: [
        { id: 0, number: 3, clue: "fork" },
        { id: 1, number: 4, clue: "hay" },
        { id: 2, number: 6, clue: "roman 6" },
        { id: 3, number: 7, clue: "poolball 7" },
        { id: 4, number: 8, clue: "leave 8" },
        { id: 5, number: 9, clue: "earth 9" },
        { id: 6, number: 12, clue: "roman 12" },
        {
          id: 7,
          number: 33,
          clue: "I will die on land, everyday I see sand,  "
        },
        { id: 8, number: 66, clue: "treasure chest" },
        {
          id: 9,
          number: 100,
          clue:
            "Not all numbers are english numerical, some old civilazations used different 'symbols' to do their maths, while building one of the 7 wonders of the world."
        },
        { id: 10, number: 17, clue: "cloth" }
      ],
      test2: [
        { id: 0, number: 0, clue: "test" },
        { id: 1, number: 0, clue: "test" },
        { id: 2, number: 0, clue: "test" },
        { id: 3, number: 0, clue: "test" },
        { id: 4, number: 0, clue: "test" },
        { id: 5, number: 0, clue: "test" },
        { id: 6, number: 0, clue: "test" },
        { id: 7, number: 0, clue: "test" },
        { id: 8, number: 0, clue: "test" },
        { id: 9, number: 0, clue: "test" },
        { id: 10, number: 0, clue: "test" }
      ],
      test3: [
        { status: "active", text: "Get a Hint - ", id: 0 },
        { status: "disabled", text: "Get a Hint - ", id: 1 },
        { status: "disabled", text: "Get a Hint - ", id: 2 },
        { status: "disabled", text: "Get a Hint - ", id: 3 },
        { status: "active", text: "Reveal Number - ", id: 4 },
        { status: "disabled", text: "Reveal Number - ", id: 5 },
        { status: "disabled", text: "Reveal Number - ", id: 6 },
        { status: "disabled", text: "Reveal Number - ", id: 7 }
      ],
      isButtonDisabled: false,

      modalNumber: [
        { id: 0, number: 0 },
        { id: 1, number: 0 },
        { id: 2, number: 0 }
      ],
      inputNumber: [
        { id: 0, number: 0, clue: "test" },
        { id: 1, number: 0, clue: "test" },
        { id: 2, number: 0, clue: "test" },
        { id: 3, number: 0, clue: "test" },
        { id: 4, number: 0, clue: "test" },
        { id: 5, number: 0, clue: "test" },
        { id: 6, number: 0, clue: "test" },
        { id: 7, number: 0, clue: "test" },
        { id: 8, number: 0, clue: "test" },
        { id: 9, number: 0, clue: "test" },
        { id: 10, number: 0, clue: "test" }
      ],
      numberCorrect: 0,
      dialog: false,
      dialogTwo: false,
      credits: 8,
      clueNumber: 0,
      activeClueProp: 0,
      hover: false,
      tempStorageRandomNumber: 0,
      tempStorageRandomClue: null,
      nextNumberActive: 1,
      wrongAttempts: 0,
      wrongNumbers: [],
      returnOverlay: "../../assets/FindNumbers.png",
      currentHour: new Date(),
      difference: 0,
      hourDifference: 0,
      minutesDifference: 0,
      displayMessage: ""
    };
  },
  computed: {
    clueArray() {
      debugger;
      return this.$store.getters.user.clueArray;
    },
    getActiveTime() {
      return this.$store.getters.user.activeTime;
    },

    showInputFields() {
      if (this.numberCorrect < 11) {
        return this.numberCorrect;
      } else {
        return 10;
      }
    },
    getHiddenNumbers() {
      return this.$store.getters.getHiddenNumbers;
    },
    getUserCredits() {
      return this.$store.getters.user.credits;
    },
    getUserCluesUsed() {
      return this.$store.getters.user.cluesUsedSearchGame;
    },
    getUserNumbersCorrect() {
      return this.$store.getters.user.userNumbersCorrect;
    }
  },
  watch: {
    vueDistance(newValue) {
      if (newValue == 0) {
        debugger;
      }
    },
    isButtonDisabled(newValue) {
      if (newValue == true) {
        let countDownDate = new Date(
          this.$store.getters.user.activeTime
        ).getTime();

        // Update the count down every 1 second
        let x = setInterval(() => {
          // Get today's date and time
          let now = new Date().getTime();

          // Find the distance between now and the count down date
          let distance = countDownDate - now;
          this.tester = distance;

          // Time calculations for days, hours, minutes and seconds
          let hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);

          // Display the result in the element with id="demo"
          document.getElementById("demo").innerHTML =
            hours + "h " + minutes + "m " + seconds + "s ";
          console.log(this.vueDistance);
          // If the count down is finished, write some text
          if (distance < 0) {
            console.log(this.vueDistance);
            debugger;

            this.clearTimeOut();
            clearInterval(x);
            document.getElementById("demo").innerHTML =
              "<button v-on:click='greet'>Greet</button>";
          }
        }, 1000);

        console.log("3 " + this.vueDistance);
      }
    },
    wrongAttempts() {
      const wrongObj = {
        wrongAttempts: this.wrongAttempts,
        wrongNumbers: this.wrongNumbers
      };
      this.$store.dispatch("wrongGuessesAction", wrongObj);
    },
    getUserCredits(newValue) {
      this.credits = newValue;
    },
    getUserCluesUsed(newValue) {
      debugger;
      this.clueNumber = newValue;
    }
  },
  mounted() {
    debugger;
    if (this.$store.getters.getUserCorrectNumbers == 11) {
      this.wrongAttempts = 0;
      this.dialogTwo = true;
    }
    this.wrongAttempts = this.$store.getters.user.wrongGuesses.wrongAttempts;
    this.wrongNumbers = this.$store.getters.user.wrongGuesses.wrongNumbers;
    this.$store.getters.user.searchGameStatus = "started";

    if (this.$store.getters.user.activeTime) {
      let d1 = new Date(this.$store.getters.user.activeTime);
      let d2 = new Date();

      console.log(d1.getTime() <= d2.getTime());
      console.log(d1.getTime());
      console.log(d2.getTime());

      if (d1.getTime() <= d2.getTime()) {
        this.isButtonDisabled = false;
      } else {
        this.isButtonDisabled = true;
        let date1 = new Date(this.$store.getters.user.activeTime);
        this.difference = Math.abs(date1.getTime() - new Date().getTime());
        this.hourDifference = Math.floor(
          (this.difference % 86400000) / 3600000
        ); // hours
        this.minutesDifference = Math.round(
          ((this.difference % 86400000) % 3600000) / 60000
        ); // minutes
      }
    }
    if (this.$store.getters.getInputNumbers) {
      debugger;
      this.inputNumber = this.$store.getters.getInputNumbers;
      if (this.$store.getters.getUserCorrectNumbers < 10) {
        this.numberCorrect = this.$store.getters.getUserCorrectNumbers;
      } else {
        this.numberCorrect = 10;
      }
    }
    if (this.$store.getters.user) {
      debugger;
      this.clueNumber = this.$store.getters.user.cluesUsedSearchGame;
    }
  },
  methods: {
    clearTimeOut() {
      this.isButtonDisabled = false;
      this.wrongAttempts = 0;
      const wrongObjTwo = {
        wrongAttempts: 0,
        wrongNumbers: this.wrongNumbers
      };

      this.$store.dispatch("wrongGuessesAction", wrongObjTwo);
    },
    validateSlot() {
      if (
        this.modalNumber[0].number == 5 &&
        this.modalNumber[1].number == 2 &&
        this.modalNumber[2].number == 6
      ) {
        this.displayMessage = "UERIKA!!! ..GATE OPENS";
      } else {
        this.displayMessage = "INCORRECT";

        if (this.wrongAttempts < 2) {
          debugger;
          this.wrongAttempts++;
        } else {
          debugger;
          this.dialogTwo = false;
          this.wrongAttempts++;
          this.disableThatButton();
        }
      }
    },
    finishGame() {
      this.$store.dispatch("finishedSearchGame");
      this.$emit("toGamelist", { title: "Dashboard" });
    },
    testMethod() {
      this.numberCorrect = 0;
      this.$store.dispatch("userNumbersCorrect", this.numberCorrect);
      this.$store.dispatch("testing", this.test);
      this.$store.dispatch("testing2", this.test2);
      this.$store.dispatch("testing3", this.test3);
    },
    /* checkStatus() {
      this.$store.dispatch("fetchUser");

      if (this.$store.getters.user.activeTime <= hours) {
       
        this.isButtonDisabled = false;
      } else {
        this.isButtonDisabled = true;
      }
    }, */
    disableThatButton() {
      this.isButtonDisabled = true;
      var today = new Date();
      today.setMinutes(today.getMinutes() + 1);

      //this.$store.dispatch("timeNow", hours);
      this.$store.dispatch("timeActive", today);
      this.$router.replace("/wrong");

      /* if (minutes < 10) {
        minutes = "0" + minutes;
      }
      //var minutes = currentTime.getUTCMinutes();
      //let newMinutes = minutes + 1;
     
      let tester = setInterval(function() {
        var currentTime = new Date();
        var minutes = currentTime.getUTCMinutes();
       
        if (minutes >= newMinutes) {
          clearInterval(tester);
          this.testDisabled = false;
         
        }
        console.log(this.testDisabled);
      }, 3000); */
    },
    continueWithGame() {
      this.hover = false;
      this.tempStorageRandomNumber = 0;
      debugger;

      if (
        this.clueArray[this.activeClueProp - 1].id <
          this.clueArray.length - 1 &&
        this.clueArray[this.activeClueProp].status != "used"
      ) {
        debugger;
        this.clueArray[this.activeClueProp - 1].status = "used";
        this.clueArray[this.activeClueProp].status = "active";
        console.log(this.clueArray);
      } else {
        this.clueArray[this.activeClueProp - 1].status = "used";
        debugger;
      }
      this.$store.dispatch("setClueArray", this.clueArray);
      debugger;
    },
    activeClue(number) {
      this.activeClueProp = number;
      this.randomHiddenClueAvailable();
      this.dialog = true;
    },
    letsPatch() {
      this.$store.dispatch("testData");
    },
    isAnswerCorrect(number) {
      let newNumber = 0;
      console.log("isAnswerCorrect(number) " + number);
      for (let i = 0; i < this.getHiddenNumbers.length; i++) {
        if (
          number == 1003 ||
          number == 1004 ||
          number == 1006 ||
          number == 1007 ||
          number == 1008 ||
          number == 1009 ||
          number == 1012 ||
          number == 1017 ||
          number == 1033 ||
          number == 1066 ||
          number == 1100
        ) {
          debugger;
          newNumber = number - 1000;
        } else {
          debugger;
          newNumber = this.inputNumber[number].number;
        }

        console.log("this.inputNumber[number].number " + number);
        debugger;
        if (newNumber == this.getHiddenNumbers[i].number) {
          this.numberCorrect++;
          debugger;
          if (this.numberCorrect == 11) {
            this.wrongAttempts = 0;
            this.dialogTwo = true;
          }
          debugger;
          var index = this.getHiddenNumbers.indexOf(this.getHiddenNumbers[i]);
          debugger;
          this.getHiddenNumbers.splice(index, 1);

          this.$store.dispatch("updatedNumbers", this.getHiddenNumbers);
          this.$store.dispatch("userInputNumbers", this.inputNumber);
          this.$store.dispatch("userNumbersCorrect", this.numberCorrect);

          return;
        }
      }
      let wrongNum = this.inputNumber[number].number;

      if (this.wrongNumbers.indexOf(wrongNum) == -1) {
        this.wrongAttempts++;
        this.wrongNumbers.push(wrongNum);
        if (this.wrongAttempts == 3) {
          this.disableThatButton();
        }
      }
    },
    decrementCredits(credit) {
      this.$store.dispatch("decreaseCredits", this.activeClueProp);
      this.$store.dispatch("cluesUsedSearchGame", this.numberCorrect + 1);
      this.inputNumber[
        this.numberCorrect
      ].number = this.tempStorageRandomNumber;

      let placeh = this.inputNumber[this.numberCorrect].number;
      console.log("placeh" + placeh);

      this.credits = this.credits - credit;
      this.dialog = false;
      if (credit < 5) {
        this.nextNumberActive = credit + 1;

        this.clueArray[credit - 1].status = "used";
        if (this.clueArray[credit].status != "used") {
          this.clueArray[credit].status = "active";
        }
      } else if (credit > 4 && credit < 8) {
        this.nextNumberActive = credit;
        this.isAnswerCorrect(placeh + 1000);
      }
      if (this.activeClueProp >= 5) {
        this.hover = true;
      }
      this.$store.dispatch("setClueArray", this.clueArray);
    },
    randomHiddenNumberAvailable() {
      var number = this.getHiddenNumbers[
        Math.floor(Math.random() * this.getHiddenNumbers.length)
      ].number;
      this.tempStorageRandomNumber = number;
      return number;
    },
    randomHiddenClueAvailable() {
      debugger;
      let number = Math.floor(Math.random() * this.getHiddenNumbers.length);

      if (this.getHiddenNumbers[number].clue == "used") {
        debugger;
        this.randomHiddenClueAvailable();
      } else {
        debugger;
        var clue = this.getHiddenNumbers[number].clue;
        this.tempStorageRandomClue = clue;
        this.getHiddenNumbers[number].clue = "used";
        this.$store.dispatch("updatedNumbers", this.getHiddenNumbers);

        return clue;
      }
    }
  }
};
</script>
<style>
.bg-image {
  background-image: url("../../assets/FindNumbers.png");
  background-size: contain;
  height: 68vh;
  width: 76vw;
}
.top-tiles {
  height: 9vh;
}
.v-text-field__details {
  display: none;
}

.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0px;
  display: none;
}

.v-messages {
  display: none;
}
.centered-input input {
  text-align: center;
}
.v-btn:not(.v-btn--round).v-size--default {
  height: 28px;
}

.theme--dark.v-input--is-disabled input {
  background-image: url("../../assets/tick.png");
  background-repeat: no-repeat;
  background-size: contain;
  border: none;
  box-shadow: none !important;
  border-radius: 0;
  margin-top: -1px;
  margin-bottom: -1px;
  margin-left: -2px;
}

.raised-button {
  box-shadow: 0.12rem 0.2rem 0.02rem 0 rgba(95, 180, 5, 0.5);
}

.jelly-button {
  cursor: pointer;
  position: relative;
  padding: 2.5rem 7.5rem;
  border-radius: 3.75rem;
  line-height: 2.5rem;
  font-size: 2rem;
  font-weight: 600;

  border: 1px solid #012880;
  background-image: linear-gradient(-180deg, #a1ff89 0%, #005a00 100%);
  box-shadow: 0 0.2rem 0.9rem 0 rgba(145, 161, 128, 0.5),
    0 -0.25rem 1.5rem rgb(48, 155, 15) inset,
    0 0.75rem 0.5rem rgba(255, 255, 255, 0.4) inset,
    0 0.25rem 0.5rem 0 rgb(93, 207, 70) inset;
}

.jelly-button span {
  padding: 5px;
  background-image: linear-gradient(0deg, #94ee82 0%, #fefafd 100%);
  -webkit-background-clip: text;
  background-clip: text;
  filter: drop-shadow(0 2px 2px rgb(0, 68, 23));
  color: rgb(236, 255, 239);
}

.jelly-button::before {
  content: "";
  display: block;
  height: 0.25rem;
  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 7.5rem);
  background: #fff;
  border-radius: 100%;

  opacity: 0.7;
  background-image: linear-gradient(
    -270deg,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 20%,
    #ffffff 80%,
    rgba(255, 255, 255, 0) 100%
  );
}

.jelly-button::after {
  content: "";
  display: block;
  height: 0.25rem;
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 7.5rem);
  background: #fff;
  border-radius: 100%;

  filter: blur(1px);
  opacity: 0.05;
  background-image: linear-gradient(
    -270deg,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 20%,
    #ffffff 80%,
    rgba(255, 255, 255, 0) 100%
  );
}

.search-game-container {
  max-width: 100%;
}

.v-btn--fab.v-size--x-large {
  width: 110px;
  height: 110px;
}

.credit-card {
  background-image: url("../../assets/credit-carl.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.v-card--reveal {
  background-size: cover;
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.7;
  position: absolute;
  width: 100%;
}

.overlay-one {
  background-image: url("../../assets/overlay-1.png");
}

.overlay-two {
  background-image: url("../../assets/overlay-2.png");
}

.overlay-three {
  background-image: url("../../assets/overlay-3.png");
}

.overlay-twelve {
  background-image: url("../../assets/overlay-12.png");
}

.overlay-five {
  background-image: url("../../assets/overlay-5.png");
}

.overlay-six {
  background-image: url("../../assets/overlay-6.png");
}

.overlay-seven {
  background-image: url("../../assets/overlay-7.png");
}

.overlay-eight {
  background-image: url("../../assets/overlay-8.png");
}

.overlay-nine {
  background-image: url("../../assets/overlay-9.png");
}

.overlay-ten {
  background-image: url("../../assets/overlay-10.png");
}

.overlay-eleven {
  background-image: url("../../assets/overlay-11.png");
}
.overlay-twelve {
  background-image: url("../../assets/overlay-12.png");
}
.overlay-thirteen {
  background-image: url("../../assets/overlay-13.png");
}
</style>
