import { Head } from "$fresh/runtime.ts";
import { Datepicker } from "$fresh_datepicker/mod.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>$fresh_datepicker - examples</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md flex items-center justify-center p-20">
        <Datepicker locales="sv-SE" />
      </div>
    </>
  );
}
