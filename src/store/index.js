import Vue from "vue";
import Vuex from "vuex";
import axios from "../axios-auth";
import globalAxios from "axios";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    userEmail: null,
    user: null,
    userSubId: null
  },
  mutations: {
    searchGameStatus(state) {
      state.user.searchGameStatus = "completed";
    },
    cluesUsedSearchGame(state, payload) {
      state.user.cluesUsedSearchGame = payload;
    },
    decreaseCredits(state, payload) {
      state.user.credits = state.user.credits - payload;
    },
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
      state.userEmail = userData.email;
    },
    storeUser(state, user) {
      state.user = user;
    },
    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
    },
    updateStateNumbers(state, newNumbers) {
      state.user.getHiddenNumbers = newNumbers;
    },
    setWrongGuesses(state, payload) {
      state.user.wrongGuesses = payload;
    }
  },
  actions: {
    finishedSearchGame({ state, commit }) {
      commit("searchGameStatus");
      globalAxios
        .patch("/users/" + state.user.id + ".json" + "?auth=" + state.idToken, {
          searchGameStatus: "completed"
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    testing({ state }, payload) {
      globalAxios
        .patch("/users/" + state.user.id + ".json" + "?auth=" + state.idToken, {
          getHiddenNumbers: payload
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    testing2({ state }, payload) {
      globalAxios
        .patch("/users/" + state.user.id + ".json" + "?auth=" + state.idToken, {
          userInputNumbers: payload
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    testing3({ state }, payload) {
      globalAxios
        .patch("/users/" + state.user.id + ".json" + "?auth=" + state.idToken, {
          clueArray: payload
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    setClueArray({ state }, payload) {
      globalAxios
        .patch("/users/" + state.user.id + ".json" + "?auth=" + state.idToken, {
          clueArray: payload
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    testData({ state }) {
      globalAxios
        .patch("/users/" + state.user.id + ".json" + "?auth=" + state.idToken, {
          game1: "completed"
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    userInputNumbers({ state }, userInput) {
      globalAxios
        .patch("/users/" + state.user.id + ".json" + "?auth=" + state.idToken, {
          userInputNumbers: userInput
        })

        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    timeNow({ state }, timeCurrent) {
      globalAxios
        .patch("/users/" + state.user.id + ".json" + "?auth=" + state.idToken, {
          currentTime: timeCurrent
        })

        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    timeActive({ state }, time) {
      globalAxios
        .patch("/users/" + state.user.id + ".json" + "?auth=" + state.idToken, {
          activeTime: time
        })

        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    userNumbersCorrect({ state }, userInputCorrect) {
      globalAxios
        .patch("/users/" + state.user.id + ".json" + "?auth=" + state.idToken, {
          userNumbersCorrect: userInputCorrect
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    updatedNumbers({ commit, state }, payload) {
      globalAxios
        .patch("/users/" + state.user.id + ".json" + "?auth=" + state.idToken, {
          getHiddenNumbers: payload
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));

      commit("updateStateNumbers", payload);
    },
    decreaseCredits({ commit, state }, payload) {
      globalAxios
        .patch("/users/" + state.user.id + ".json" + "?auth=" + state.idToken, {
          credits: state.user.credits - payload
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
      commit("decreaseCredits", payload);
    },
    cluesUsedSearchGame({ commit, state }, payload) {
      globalAxios
        .patch("/users/" + state.user.id + ".json" + "?auth=" + state.idToken, {
          cluesUsedSearchGame: payload
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
      commit("cluesUsedSearchGame", payload);
    },
    wrongGuessesAction({ commit, state }, payload) {
      globalAxios
        .patch("/users/" + state.user.id + ".json" + "?auth=" + state.idToken, {
          wrongGuesses: payload
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
      commit("setWrongGuesses", payload);
    },
    setLogoutTimer({ dispatch }, expirationTime) {
      setTimeout(() => {
        dispatch("logout");
      }, expirationTime * 8000);
    },
    signup({ commit, dispatch }, authData) {
      axios
        .post("/accounts:signUp?key=AIzaSyD3nyzk_QQ0J5H8UFtKovvzD8-ul8wEGJc", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })

        .then((res) => {
          console.log(res);
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId,
            email: res.data.email
          });
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("expirationDate", expirationDate);
          dispatch("storeUser", authData);
          dispatch("setLogoutTimer", res.data.expiresIn);
        })
        .catch((error) => console.log(error));
      router.replace("/signin");
    },

    login({ commit, dispatch }, authData) {
      axios
        .post(
          "/accounts:signInWithPassword?key=AIzaSyD3nyzk_QQ0J5H8UFtKovvzD8-ul8wEGJc",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then((res) => {
          console.log(res);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 8000
          );
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("expirationDate", expirationDate);

          commit("authUser", {
            email: res.data.email,
            token: res.data.idToken,
            userId: res.data.localId,
            getHiddenNumbers: res.data.getHiddenNumbers //investigate
          });

          dispatch("setLogoutTimer", res.data.expiresIn);

          router.replace("/dashboard");
        })
        .catch((error) => console.log(error));
    },
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      const now = new Date();
      console.log(now.getTime() >= expirationDate.getTime());
      if (now.getTime() >= expirationDate.getTime()) {
        return;
      }

      const userId = localStorage.getItem("userId");
      let email = localStorage.getItem("email");
      commit("authUser", {
        token: token,
        userId: userId,
        email: email
      });
    },

    logout({ commit }) {
      commit("clearAuthData");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      router.replace("/signin");
    },
    storeUser({ state }, userData) {
      if (!state.idToken) {
        return;
      }
      globalAxios
        .post("/users.json" + "?auth=" + state.idToken, userData)
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    fetchUser({ commit, state }) {
      if (!state.idToken) {
        return;
      }
      globalAxios

        .get("/users.json" + "?auth=" + state.idToken)
        .then((res) => {
          console.log(res);
          const data = res.data;
          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;

            if (user.email == state.userEmail) {
              commit("storeUser", user);
            }
            users.push(user);
          }
        })
        .catch((error) => console.log(error));
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.idToken !== null;
    },
    getHiddenNumbers(state) {
      return state.user.getHiddenNumbers;
    },
    getInputNumbers(state) {
      return state.user.userInputNumbers;
    },
    getUserCorrectNumbers(state) {
      return state.user.userNumbersCorrect;
    }
  }
});
