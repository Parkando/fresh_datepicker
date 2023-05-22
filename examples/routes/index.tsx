import { Head } from "$fresh/runtime.ts";
import Datepicker from "../islands/datepicker.tsx";

export default function Home() {
  return (
    <div class="bg-blue-400">
      <Head>
        <title>$fresh_datepicker - examples</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md flex items-center justify-center p-20">
        <Datepicker />
      </div>
    </div>
  );
}
