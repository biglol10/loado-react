import { Image } from 'semantic-ui-react';

const showContentPopupValue = (content) => {
  const justContent = (
    <div
      style={{
        backgroundColor: 'rgb(56, 72, 98)',
        color: 'white',
        padding: '5px',
        fontSize: '10px',
      }}
    >
      {content}
    </div>
  );

  const contentKeyKorToEng = {
    휴식게이지: 'calendar',
    카오스던전: 'chaosDun',
    가디언던전: 'guardianDun',
    에포나: 'epona',
    주간가디언: 'guardianDun',
    어비스던전: 'abyss2types',
    아르고스: 'argos',
    발탄: 'baltan',
    비아키스: 'biakiss',
    쿠크세이튼: 'kukuseitn',
    아브렐슈드: 'abrel',
  };

  const imageContent = (
    <div>
      <Image
        src={`./images/loa_icons/${contentKeyKorToEng[content]}.png`}
        avatar
        className='contentImage'
      />
    </div>
  );

  return [imageContent, justContent];
};

export { showContentPopupValue };
