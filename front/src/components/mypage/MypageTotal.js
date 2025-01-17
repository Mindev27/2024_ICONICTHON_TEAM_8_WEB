import Header from "../basic/Header";
import PersonalGetList from "./PersonalGetList";
import PersonalInfo from "./PersonalInfo";
import "./MypageTotal.css";

function MypageTotal() {
  return (
    <>
      <Header name="마이페이지" />
      <PersonalInfo />
      <div className="application-details-title">수취 신청 내역</div>
      <PersonalGetList />
    </>
  );
}

export default MypageTotal;
