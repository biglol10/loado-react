import characterImage from "./characterDefinition";

const characters = [
  "arcana",
  "bard",
  "battlemaster",
  "berserker",
  "blade",
  "blaster",
  "demonic",
  "destroyer",
  "devilhunter",
  "gunslinger",
  "hawkeye",
  "holyknight",
  "infighter",
  "lancemaster",
  "reaper",
  "scouter",
  "sorceress",
  "soulmaster",
  "striker",
  "summoner",
  "warlord",
];

const characterKorean = {
  arcana: "아르카나",
  bard: "바드",
  battlemaster: "배틀마스터",
  berserker: "버서커",
  blade: "블레이드",
  blaster: "블래스터",
  demonic: "데모닉",
  destroyer: "디스트로이어",
  devilhunter: "데빌헌터",
  gunslinger: "건슬링어",
  hawkeye: "호크아이",
  holyknight: "홀리나이트",
  infighter: "인파이터",
  lancemaster: "창술사",
  reaper: "리퍼",
  scouter: "스카우터",
  sorceress: "소서리스",
  soulmaster: "기공사",
  striker: "스트라이커",
  summoner: "서머너",
  warlord: "워로드",
};

const characterDropdownOptions = [];

let characterValue = {};

for (let index = 0; index < characters.length; index++) {
  characterValue = {
    key: characters[index],
    text: characterKorean[characters[index]],
    value: characters[index],
    image: { avatar: true, src: characterImage[characters[index]] },
  };
  characterDropdownOptions.push(characterValue);
}

export default characterDropdownOptions;
