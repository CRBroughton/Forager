<template>
  <div class="bottom-0 flex items-center justify-center w-full">
    <div class="max-w-screen-md w-full flex flex-wrap content-end sm:p-2 p-2">
      <div class="w-full flex flex-col bg-gray-100 rounded-2xl shadow-2xl">
        <div class="w-full pt-2 flex justify-center">
          <div
            class="h-14 w-14 bg-white flex justify-center items-center rounded-full cursor-pointer"
          >
            <img src="" alt="" srcset="../assets/logo.png" class="w-10 h-10" />
          </div>
        </div>
        <div
          class="w-full p-2 flex justify-center items-center text-gray-500 font-semibold"
        >
          <p>Forager</p>
        </div>
        <div
          class="w-full pb-2 flex flex-col justify-center items-center text-gray-500 text-xs"
        >
          <p class="pb-1">By Craig Broughton</p>
          <p>Version {{ version }}</p>
        </div>
        <div class="w-full h-full flex flex-wrap content-end">
          <div class="w-full bottom-0 p-1 bg-gray-200 rounded-xl m-1">
            <div
              class="w-full grid grid-cols-1 justify-center m-auto rounded-xl p-1"
            >
              <crypto-base
                @click="goToPaypal"
                title="Paypal"
                url="https://paypal.com"
                :image="paypalImage"
                data-test="paypal"
              />
            </div>
            <div
              class="w-full grid grid-cols-2 gap-2 justify-center m-auto rounded-xl p-1"
            >
              <crypto-base
                title="Bitcoin"
                url="https://bitcoin.org/en/"
                :image="bitcoinImage"
                :CryptoAddress="bitcoinAddress"
              />
              <crypto-base
                title="Litecoin"
                url="https://litecoin.com/en/"
                :image="litecoinImage"
                :CryptoAddress="litecoinAddress"
              />
              <crypto-base
                title="Bitcoin Cash"
                url="https://www.bitcoincash.org/"
                :image="bitcoinCashImage"
                :CryptoAddress="bitcoinCashAddress"
              />
              <crypto-base
                title="Ethereum"
                url="https://ethereum.org/en/"
                :image="EthereumImage"
                :CryptoAddress="EthereumAddress"
              />
            </div>
          </div>
          <div class="w-full bottom-0 py-1 px-1">
            <div
              class="w-full flex justify-center m-auto py-2 bg-gray-200 rounded-xl"
            >
              <MyButton
                title="Close"
                class="mb-1 mr-1 ml-1 w-full"
                @click="hideDonationScreen"
                data-test="donation-close"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import MyButton from "./buttons/BaseButton.vue";
import { version } from "../functions/App";
import { defineComponent } from "@vue/runtime-core";
import CryptoBase from "@/components/CryptoBase.vue";
import { donationPopupVisible } from "@/functions/SideMenu";

export default defineComponent({
  components: {
    MyButton,
    CryptoBase,
  },
  setup() {
    const bitcoinImage = ref<string>("bitcoin.png");
    const litecoinImage = ref<string>("litecoin.svg");
    const bitcoinCashImage = ref<string>("bitcoincash.png");
    const EthereumImage = ref<string>("ethereum.png");
    const paypalImage = ref<string>("paypal.png");
    const cryptoDonateAction = ref<string>("Copy Address");
    const donationLink = "https://paypal.me/CRBroughton";

    const bitcoinAddress = ref<string>("39eUhAegcY1KEEumtrgrKW4PL11JmcCQPx");
    const litecoinAddress = ref<string>("MX19AXaN2qCH6M45fkpN5Umh9mLwDMUMCA");
    const bitcoinCashAddress = ref<string>(
      "qzasnvxdv220tjpc9pfjakqvv6ckfa0gruqkyf4eg4"
    );
    const EthereumAddress = ref<string>(
      "0x6F08422a6B0D7514ef4D6103C6244555d8c95772"
    );

    const hideDonationScreen = () => {
      donationPopupVisible.value = !donationPopupVisible.value;
    };

    const goToPaypal = () => {
      window.location.href = donationLink;
    };

    return {
      hideDonationScreen,
      version,
      bitcoinImage,
      litecoinImage,
      bitcoinCashImage,
      EthereumImage,
      paypalImage,
      cryptoDonateAction,
      goToPaypal,
      donationPopupVisible,
      bitcoinAddress,
      litecoinAddress,
      bitcoinCashAddress,
      EthereumAddress,
    };
  },
});
</script>

<style scoped></style>
