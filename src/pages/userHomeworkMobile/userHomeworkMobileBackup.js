<Segment id="mobileMainPageSegment">
  <PaginationComp
    pagination={pagination}
    activePage={activePage}
    pageChange={pageChange}
    deviceType="mobile"
  />
  <div
    style={{
      display: "flex",
      marginTop: "20px",
      justifyContent: "space-between",
      marginBottom: "10px",
    }}
  >
    <SettingChange
      viewByCheckBox={viewByCheckBox}
      changeUserCheckBoxConfigurationFunction={
        changeUserCheckBoxConfigurationFunction
      }
      deviceType="mobile"
    />
    <AddAndChange
      addCharacter={addCharacter}
      applyChanges={applyChanges}
      style={{ fontSize: "5px" }}
    />
  </div>
  <Segment basic id="mobileSegmentGrid">
    <Grid columns={limit + 1}>
      <Grid.Row
        style={{
          borderBottom: !showNote && "0.05rem inset ivory",
        }}
      >
        <Grid.Column className="contentColumn">
          <AlarmAndNoteMobile
            alarmTrue={alarmTrue}
            alarmRestValue={alarmRestValue}
            userTodoData={userTodoData}
            showNote={showNote}
            setShowNote={setShowNote}
          />
        </Grid.Column>
        {userTodoData.map((item, idx) => (
          <CharacterAvatar
            itemId={item._id}
            character={item.character}
            characterName={item.characterName}
            attributeChanged={item.attributeChanged}
            weeklyAttributeChanged={item.weeklyAttributeChanged}
            axiosConfigAuth={axiosConfigAuth}
            viewPage={viewPage}
            alarmCharacter={item.alarmCharacter}
            limit={limit}
            dontChange={item.dontChange}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
            deviceType="mobile"
            activePage={activePage}
            setActivePage={setActivePage}
          />
        ))}
      </Grid.Row>
      {showNote && (
        <Grid.Row
          style={{
            padding: 0,
            borderBottom: "0.05rem inset ivory",
            paddingBottom: "7px",
          }}
        >
          <Grid.Column />
          {userTodoData.map((item, idx) => (
            <PerIdNote
              item={item}
              userTodoData={userTodoData}
              setUserTodoData={setUserTodoData}
              deviceType="mobile"
            />
          ))}
        </Grid.Row>
      )}
      <Grid.Row className="eachRow">
        <Grid.Column className="contentColumn">
          <Popup
            on="click"
            pinned
            trigger={
              <Icon
                name="calendar check outline"
                style={{ fontSize: "21px" }}
              />
            }
            content={showContentPopupValue("???????????????")[1]}
            id="clickPopup"
          />
        </Grid.Column>
        {userTodoData.map((item, idx) => (
          <RestValueMobile
            item={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
          />
        ))}
      </Grid.Row>
      <Grid.Row className="eachRow">
        <Grid.Column className="contentColumn">
          <Popup
            on="click"
            pinned
            trigger={showContentPopupValue("???????????????")[0]}
            content={showContentPopupValue("???????????????")[1]}
            id="clickPopup"
          />
        </Grid.Column>
        {userTodoData.map((item, idx) => (
          <ChaosDunValue
            chaosItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
            viewByCheckBox={viewByCheckBox}
          />
        ))}
      </Grid.Row>
      <Grid.Row className="eachRow">
        <Grid.Column className="contentColumn">
          <Popup
            on="click"
            pinned
            trigger={showContentPopupValue("???????????????")[0]}
            content={showContentPopupValue("???????????????")[1]}
            id="clickPopup"
          />
        </Grid.Column>
        {userTodoData.map((item, idx) => (
          <GuardianDunValue
            guardianItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
            viewByCheckBox={viewByCheckBox}
          />
        ))}
      </Grid.Row>
      <Grid.Row className="eachRow">
        <Grid.Column className="contentColumn">
          <Popup
            on="click"
            pinned
            trigger={showContentPopupValue("?????????")[0]}
            content={showContentPopupValue("?????????")[1]}
            id="clickPopup"
          />
        </Grid.Column>
        {userTodoData.map((item, idx) => (
          <EponaValue
            eponaItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
            viewByCheckBox={viewByCheckBox}
          />
        ))}
      </Grid.Row>
      <Grid.Row className="eachRow">
        <Grid.Column className="contentColumn">
          <Popup
            on="click"
            pinned
            trigger={showContentPopupValue("???????????????")[0]}
            content={showContentPopupValue("???????????????")[1]}
            id="clickPopup"
          />
        </Grid.Column>
        {userTodoData.map((item, idx) => (
          <WeeklyGuardian
            weeklyGuardianItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
            viewByCheckBox={viewByCheckBox}
          />
        ))}
      </Grid.Row>
      <Grid.Row className="eachRow">
        <Grid.Column className="contentColumn">
          <Popup
            on="click"
            pinned
            trigger={showContentPopupValue("???????????????")[0]}
            content={showContentPopupValue("???????????????")[1]}
            id="clickPopup"
          />
        </Grid.Column>
        {userTodoData.map((item, idx) => (
          <AbyssDun2
            abyssDun2Item={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
          />
        ))}
      </Grid.Row>
      <Grid.Row className="eachRow">
        <Grid.Column className="contentColumn">
          <Popup
            on="click"
            pinned
            trigger={showContentPopupValue("????????????")[0]}
            content={showContentPopupValue("????????????")[1]}
            id="clickPopup"
          />
        </Grid.Column>
        {userTodoData.map((item, idx) => (
          <ArgosRaid
            argosRaidItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
          />
        ))}
      </Grid.Row>
      <Grid.Row className="eachRow baltanRow">
        <Grid.Column className="contentColumn">
          <Popup
            on="click"
            pinned
            trigger={showContentPopupValue("??????")[0]}
            content={showContentPopupValue("??????")[1]}
            id="clickPopup"
          />
        </Grid.Column>
        {userTodoData.map((item, idx) => (
          <BaltanRaid
            baltanRaidItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
          />
        ))}
      </Grid.Row>
      <Grid.Row className="eachRow">
        <Grid.Column className="contentColumn">
          <Popup
            on="click"
            pinned
            trigger={showContentPopupValue("????????????")[0]}
            content={showContentPopupValue("????????????")[1]}
            id="clickPopup"
          />
        </Grid.Column>
        {userTodoData.map((item, idx) => (
          <BiakissRaid
            biakissRaidItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
          />
        ))}
      </Grid.Row>
      <Grid.Row className="eachRow">
        <Grid.Column className="contentColumn">
          <Popup
            on="click"
            pinned
            trigger={showContentPopupValue("???????????????")[0]}
            content={showContentPopupValue("???????????????")[1]}
            id="clickPopup"
          />
        </Grid.Column>
        {userTodoData.map((item, idx) => (
          <KukseitnRaid
            kukseitnRaidItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
          />
        ))}
      </Grid.Row>
      <Grid.Row className="abrelRow">
        <Grid.Column className="contentColumn">
          <Popup
            on="click"
            pinned
            trigger={showContentPopupValue("???????????????")[0]}
            content={showContentPopupValue("???????????????")[1]}
            id="clickPopup"
          />
        </Grid.Column>
        {userTodoData.map((item, idx) => (
          <AbrelRaid
            abrelRaidItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
          />
        ))}
      </Grid.Row>
    </Grid>
  </Segment>
</Segment>;
