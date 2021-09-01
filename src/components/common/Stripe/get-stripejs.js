
 import { loadStripe } from '@stripe/stripe-js'

 let stripePromise = null;
 const getStripe = () => {
   if (!stripePromise) {
     stripePromise = loadStripe('pk_test_51J0KQiSGk0zsbKBlfPodRAclTu0MnkW4ffxiu2uHmdeBZnPL9pBCIvqYDDv7xvICPEMq2kuXGndYF86CLfgziyWR00dJcQXfIs')
   }
   return stripePromise
 }
 
 export default getStripe