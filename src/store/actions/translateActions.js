import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constants";

// api den dil verileri alir
export const getLanguages = createAsyncThunk("getLanguages", async () => {
  //api istegi
  const res = await axios.request(options);
  const data = res.data.data.languages;
  /*
 diziyi donüp herbir objesi icin value ve label 
 degerlerine sahip yeni bir obje olusturucaz
 */
  const refinedData = data.map((item) => ({
    value: item.code,
    label: item.name,
  }));
  //store ' a gonderilecek veri
  return refinedData;
});
//cevri yapar
export const translateText = createAsyncThunk("translate", async (params) => {
  // console.log(params);

  //api istegi icin gerekli ayarlar

  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", params.sourceLang.value);
  encodedParams.set("target_language", params.targetLang.value);
  encodedParams.set("text", params.text);

  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "aaa87057c5mshd59e724c7729e2fp1401ffjsnc9179aababe1",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    data: encodedParams,
  };

  //api istegi atma
  const res = await axios.request(options);
  console.log(res);
  //store'a aktar

  return res.data.data.translatedText;
});
