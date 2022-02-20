# 로스트아크 숙제관리 [Loado]

### Loado는 React와 Node(express)로 작성되었습니다

###### 로스트아크를 집과 피시방에 번갈아가면서 플레이 할 경우 어떤 숙제가 있는지 확인하기가 어려우니
###### DB화 하여 언제 어디서든 유저의 숙제를 확인할 수 있는 기능을 구축했습니다
###### 로그인 시 쿠키가 생성되며 브라우저 쿠키가 막혀있을 경우 작동하지 않을 것입니다
접속 URL: https://loado-app.herokuapp.com
<br/>

업데이트 내역
https://github.com/biglol10/loado-react/blob/main/UPDATE.md
<br/>

홍보 URL
<br/>
https://www.inven.co.kr/board/lostark/4811/3023904   조회수: 11,258 | 추천수: 83 | 댓글: 40
<br/>
https://www.inven.co.kr/board/lostark/4811/3184415   조회수: 8,630 | 추천수: 42 | 댓글: 15
<br/>
https://www.inven.co.kr/board/lostark/4811/4124077   조회수: 36,211 | 추천수: 209 | 댓글: 119
<br/>

---

#### **화면 개요**
![image](https://user-images.githubusercontent.com/46738034/131291521-a33d2ecd-b6dc-4d3f-9c41-2ff60e6a305c.png)
<br/><br/>

---

#### **Loado의 주요 기능**
1. 케릭터와 휴식게이지 정보 추가, 한 아이디 당 24케릭 추가 가능
2. 휴식게이지 수정
3. 카오스던전, 가디언토벌, 에포나 수행 횟수에 따른 휴식게이지 감소/증가
4. 원정대 단위 컨탠츠는 수정 시 원정대에 반영 (어비스 레이스, 리허설, 데자뷰)
5. 매일 6시마다 카던, 가디언, 에포나 횟수 초기화 및 휴식게이지 반영. 수요일(로요일)의 경우 주간 컨탠츠 전부 초기화
6. 휴식게이지가 40 이상 (에포나의 경우 60) 인 케릭터들 알람 표시
7. 휴식게이지에 상관없이 매일 숙제를 도는 케릭터의 경우 휴식게이지를 고정할 수 있는 기능 존재
8. 케릭터 추가/삭제에 따른 페이징처리
9. 케릭터 당 노트 기록 기능 추가 (20자 이내)
10. 개인 휴식게이지 반영
11. 관심있는 아이템 시세 조회 

<br/>

---

#### * 케릭터 추가
케릭터 추가 버튼 클릭 시 중앙에 케릭터 정보를 입력할 수 있는 팝업 등장
![image](https://user-images.githubusercontent.com/46738034/131293340-b8aa3357-e3c7-4825-95f4-9c781451a3fc.png)
<br/><br/>

#### * 휴식게이지 수정
휴식게이지에 마우스 우클릭 시 케릭터의 휴식게이지를 수정할 수 있는 팝업 등장 (숫자는 10단위)
위아래 버튼 및 타이핑으로 수정 가능 <br/>
![image](https://user-images.githubusercontent.com/46738034/131293598-4aafd97a-745a-4fed-9d7c-0cf98d6d5a10.png)
<br/><br/>

#### * 휴식게이지 감소/증가
카오스던전, 가디언토벌, 에포나 횟수 입력 후 [변경사항 저장] 버튼 클릭 시 변경내역이 있는 케릭터들의 휴식게이지 감소/증가
![image](https://user-images.githubusercontent.com/46738034/131294086-0865e51b-821e-48e3-9816-5dcc62bc362d.png)
<br/><br/>

#### * 휴식게이지 알람 표시
좌측 상단의 알람 표시를 클릭 시 휴식게이지가 40 이상이거나 에포나 휴식게이지가 60 이상인 케릭터의 이름이 깜빡이게 되는 기능
![image](https://user-images.githubusercontent.com/46738034/131294451-a8fdc233-1180-4c62-a972-62284b93c375.png)
<br/><br/> 

#### * 휴식게이지 고정/고정해제 기능
(매일 숙제를 하기에 카오스던전, 가디언토벌, 에포나 입력을 스킵하고 싶은 경우)
케릭터명에 마우스 우클릭 => 알람/알람해제 아이콘이 나오면서 클릭 후 변경사항 저장 시 해당 케릭터는 매일 06시에 휴식게이지가 반영되지 않음
<br/>
![image](https://user-images.githubusercontent.com/46738034/131294978-a2807011-5c70-4cd5-81c5-193d65e4a102.png)
<br/><br/>

#### * 케릭터 추가/삭제 페이징처리
[케릭터 추가]로 케릭터를 추가할 수 있으며 케릭터명을 클릭 시 삭제 아이콘이 등장
한 페이지에 8개의 케릭터만 표시될 수 있으며 9개 이상의 케릭터에 대한 페이징 처리 기능
![image](https://user-images.githubusercontent.com/46738034/131295325-d7c5bc97-7c5d-4446-9010-286fe529cda7.png)
<br/>
삭제 처리 시
![image](https://user-images.githubusercontent.com/46738034/131295400-e6043f38-cd98-4bd2-99a0-b42fed02fba5.png)
<br/><br/>

#### * 케릭터 당 노트 기능 추가
케릭터별로 노트를 추가할 수 있으며 좌측 알람 옆의 노트 아이콘 클릭 시 노트가 표시되며 수정가능
![image](https://user-images.githubusercontent.com/46738034/132095437-54d48d69-be83-492a-9266-8424e80858a1.png)
<br/><br/>

#### * 개인 휴식게이지 증가 기능 추가
06시에 휴식게이지가 자동적으로 증가하게끔 되어있지만 어떤 이유로 증가되지 않은 경우
[휴식게이지반영] 버튼을 클릭하여 컨탠츠 횟수에 따른 휴식게이지 증가 가능
![image](https://user-images.githubusercontent.com/46738034/132098496-ea70cfab-8288-479f-8b06-fa20126523b5.png)
<br/><br/>

#### * 숫자선택 대신 체크박스로 컨탠츠 체크할 수 있는 기능 추가
카오스던전, 가디언토벌, 에포나의 경우 클릭하여 몇번 수행했는지 0,1,2,3을 선택하게 되어있지만 
보통의 경우 2,3번 한꺼번에 도니 체크박스로 체크할 수 있는 기능 추가 의견반영
<br/>
![image](https://user-images.githubusercontent.com/46738034/133057838-5e898f04-805d-47c4-a443-b1a400475993.png)
<br/><br/>

#### * 모바일웹 기능 추가
같은 URL로 모바일로 접속 시 모바일 화면에 맞는 UI 구성 표시<br/>
![image](https://user-images.githubusercontent.com/46738034/134879884-5d08dc01-5bcd-4588-a6ae-5107b42830e6.png)
<br/><br/>

#### * 프로필 사진 업데이트
사용자가 자신의 프로필 사진을 업데이트 할 수 있도록 개발
<br/>
![image](https://user-images.githubusercontent.com/46738034/136589058-6c670035-1c72-4e54-9eb9-b3d7a8f1ee77.png)
<br/>
![image](https://user-images.githubusercontent.com/46738034/136589177-049019fb-25f2-4e93-b20e-13ffb5d0734d.png)
<br/><br/>

#### * 관심있는 아이템 시세 조회
사용자가 관심있어 하는 아이템에 대한 시세를 일주일 + 6시간 단위로 볼 수 있는 기능
<br/>
![image](https://user-images.githubusercontent.com/46738034/151933822-034232f7-f3c5-4b25-97d0-02870f6d639f.png)
<br/>
![image](https://user-images.githubusercontent.com/46738034/151933971-dd1dc8af-d721-4f71-a8d1-f45d6333f9b1.png)
<br/>
![image](https://user-images.githubusercontent.com/46738034/151934074-223601f9-d217-4dcf-94b2-7ca099c6cfa6.png)
<br/><br/>
