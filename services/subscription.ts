import axios from "axios";

const BASE_URL = "https://api.convertkit.com/v3";
const API_KEY = "8se8BoMzuoau3XpL3O_ABw";
const API_SECRET = "JQDqx1WpaYDgaMNmCarU1xPmm1cwO-ezAtzhWF4tid0";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const subscribe = async (email: string): Promise<any> => {
  try {
    const response = await instance.post("/forms/5609148/subscribe", {
      api_key: API_KEY,
      email: email,
    });

    if (
      response.status === 200 &&
      response.data.subscription.state !== "canceled"
    ) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("subscriptionState", "active");
      localStorage.setItem(
        "subscriber_id",
        response.data.subscription.subscriber.id
      );

      return response.data;
    } else {
      console.error("Failed to subscribe");
    }
  } catch (error) {
    console.error("Error in subscription:", error);
  }
};

export const unsubscribe = async (): Promise<any> => {
  const email = localStorage.getItem("userEmail");
  try {
    const response = await instance.put("/unsubscribe", {
      api_secret: API_SECRET,
      email: email,
    });

    if (response.status === 200) {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("subscriptionState");
      localStorage.removeItem("subscriber_id");
      return response.data;
    } else {
      console.error("Failed to unsubscribe");
    }
  } catch (error) {
    console.error("Error in unsubscription:", error);
  }
};

export const checkSubscriptionStatus = async (): Promise<any> => {
  const subscriberId = localStorage.getItem("subscriber_id");
  console.log("Subscriber ID:", subscriberId);
  try {
    const response = await instance.get(`/subscribers/${subscriberId}`, {
      params: {
        api_secret: API_SECRET,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to unsubscribe");
    }
  } catch (error) {
    console.error("Error in checking subscription:", error);
  }
};