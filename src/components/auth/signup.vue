<template>
  <div class="signup">
    <v-card class="mx-auto mt-7" max-width="60vw" outlined elevation="10">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">SETUP</v-list-item-title>
          <v-card-text
            >Before we get you sign-up, let us explain how things work. The buy
            in is R50, R45 goes to the treasure chest and R5 goes to our admin
            costs. In-game all contestants will have the option to use 3 hints
            in every game, 1st hint can be bought for R50, second R100 and third
            will be a whopping R350. This is a free game (well except the buy
            in) to challenge you, but this was designed to be very hard, so only
            the best of the best can win our challenge, but if you get stuck you
            will have the option for the hint at a financial penalty. Make no
            mistake this will be hard, in a world that is full of competitions
            that makes it near impossible not to solve it, we decided it is time
            to make a real competition where you actually have to solve hard
            puzzles and not get it within minutes. You will begin with a hidden
            map and every time you solve one of the 38 puzzles you will unhide a
            piece of the treasure map. Some pieces will be time based and only
            available at certain times but the most can be completed whenever
            you want, but keep in mind, first to unhide the entire map will
            probably be the champion.
          </v-card-text>
          <div class="signup-form">
            <form @submit.prevent="onSubmit">
              <v-row>
                <v-col cols="6">
                  <div class="input">
                    <label for="name">First Name</label>
                    <input type="text" id="firstname" v-model="firstname" />
                  </div>
                  <div class="input">
                    <label for="email">E-Mail</label>
                    <input type="email" id="email" v-model="email" />
                  </div>
                  <div class="input">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" />
                  </div>
                  <div class="input inline">
                    <input type="checkbox" id="terms" v-model="terms" />
                    <label for="terms"> Accept Terms of Use</label>
                  </div>
                  <div class="submit">
                    <button type="submit">Submit</button>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="input">
                    <label for="surname">Surname</label>
                    <input type="text" id="surname" v-model="surname" />
                  </div>
                  <div class="input">
                    <label for="username">User Name</label>
                    <input type="text" id="username" v-model="username" />
                  </div>
                  <div class="input">
                    <label for="confirm-password">Confirm Password</label>
                    <input
                      type="password"
                      id="confirm-password"
                      v-model="confirmPassword"
                    />
                  </div>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstname: "",
      surname: "",
      email: "",
      username: "",
      age: null,
      password: "",
      confirmPassword: "",
      country: "usa",
      searchGameHiddenNumbers: [
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
      terms: false
    };
  },
  methods: {
    onAddHobby() {
      const newHobby = {
        id: Math.random() * Math.random() * 1000,
        value: ""
      };
      this.hobbyInputs.push(newHobby);
    },
    onDeleteHobby(id) {
      this.hobbyInputs = this.hobbyInputs.filter((hobby) => hobby.id !== id);
    },
    onSubmit() {
      const formData = {
        firstname: this.firstname,
        surname: this.surname,
        email: this.email,
        username: this.username,
        age: this.age,
        password: this.password,
        confirmPassword: this.confirmPassword,
        country: this.country,
        terms: this.terms,
        getHiddenNumbers: this.searchGameHiddenNumbers,
        credits: 100,
        cluesUsedSearchGame: 0,
        userNumbersCorrect: 0,
        wrongGuesses: {
          wrongAttempts: 0,
          wrongNumbers: [0]
        },
        clueArray: [
          { status: "active", text: "Get a Hint - ", id: 0 },
          { status: "disabled", text: "Get a Hint - ", id: 1 },
          { status: "disabled", text: "Get a Hint - ", id: 2 },
          { status: "disabled", text: "Get a Hint - ", id: 3 },
          { status: "active", text: "Reveal Number - ", id: 4 },
          { status: "disabled", text: "Reveal Number - ", id: 5 },
          { status: "disabled", text: "Reveal Number - ", id: 6 },
          { status: "disabled", text: "Reveal Number - ", id: 7 }
        ],
        searchGameStatus: "not started"
      };

      console.log(formData);
      this.$store.dispatch("signup", formData);
    }
  }
};
</script>

<style scoped>
.signup-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input.inline label {
  display: inline;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input.inline input {
  width: auto;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}

.input select {
  border: 1px solid #ccc;
  font: inherit;
}

.hobbies button {
  border: 1px solid #521751;
  background: #521751;
  color: white;
  padding: 6px;
  font: inherit;
  cursor: pointer;
}

.hobbies button:hover,
.hobbies button:active {
  background-color: #8d4288;
}

.hobbies input {
  width: 90%;
}

.submit button {
  border: 1px solid #521751;
  color: #521751;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #521751;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}

.signup {
  height: 93vh;
  background-image: url("./../../assets/scene5.png");
  background-size: cover;
  background-position: top;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}
</style>
