import { Loader } from "https://cdn.skypack.dev/@googlemaps/js-api-loader";

//firestore初期化
const firebaseConfig = {
  apiKey: "AIzaSyADVTYJmrHC-uO7b3dRQNENvB_ysgVTIeM",
  authDomain: "resortech-6d2a7.firebaseapp.com",
  projectId: "resortech-6d2a7",
  storageBucket: "resortech-6d2a7.appspot.com",
  messagingSenderId: "652158091051",
  appId: "1:652158091051:web:6202ff9a9f9e45e4e28f6e",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/**
 * マップを呼び出している
 */
async function initMap(lat, lng) {
  const loader = new Loader({
    apiKey: "AIzaSyADVTYJmrHC-uO7b3dRQNENvB_ysgVTIeM",
    version: "weekly",
  });

  let map;
  try {
    await loader.load();

    // 緯度・経度を設定
    const location = { lat: lat, lng: lng };

    map = new google.maps.Map(document.getElementById("map"), {
      center: location,
      zoom: 15,
    });

    // ピンを立てる
    const marker = new google.maps.Marker({
      position: location,
      map: map,
    });
  } catch (error) {
    console.error("Error loading Google Maps API: ", error);
  }
}

/**
 * クエリパラメータの値を取得する関数
 * @param {string} paramName 取得したいクエリパラメータの名前
 * @returns {string|null} クエリパラメータの値
 */
function getQueryParam(paramName) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(paramName);
}

/**
 * 指定されたspotIdに対応するドキュメントをFirestoreから取得し、そのデータをオブジェクト形式で表示します。
 * @param {string} spotId - 取得したいドキュメントのID（スポット名）
 * @returns {Promise<void>} ドキュメントデータの表示処理が完了するまでのPromise
 * @throws エラーが発生した場合、エラーメッセージをコンソールに表示します。
 */
async function fetchSpotData(spotId) {
  // spotsコレクションからドキュメントIDがspotIdに一致するドキュメントの参照を取得
  const docRef = db.collection("spots").doc(spotId);

  try {
    const doc = await docRef.get();
    if (doc.exists) {
      // console.log("Document data:", doc.data());
      let spot_data = doc.data();
      return spot_data;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

/**
 * displayobj - オブジェクトを元にHTML要素にデータを設定する
 * @param {Object} obj - スポット情報を含むオブジェクト
 */
function displayobj(obj) {
  // テキストコンテンツメソッドでHTML要素に値を出力
  //XSS攻撃を防ぐことができる
  console.log(obj)
  document.getElementById("spotName").textContent = getQueryParam("id");
  document.getElementById("spotContent").textContent = obj.content;
  document.getElementById("address").textContent = obj.address;
  document.getElementById("businessday").textContent = obj.businessday;
  document.getElementById("closedday").textContent = obj.closedday;
  document.getElementById("tel_num").textContent = obj.tel_num;
  document.getElementById("hasWifi").textContent = obj.hasWifi;
  document.getElementById("park_address").textContent = obj.park_address;
  document.querySelector(".official_button").href = obj.official_link;

  //緯度
  const latitude = obj.park_point._lat;
  //経度
  const longitude = obj.park_point._long;
  //マップの呼び出し
  initMap(latitude, longitude);
}


displayobj(await fetchSpotData(getQueryParam("id")));
