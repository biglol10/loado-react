<Segment id="gridSegment">
  <Grid className="fullPage">
    <Container id="gridContainer">
      <Grid.Column width={16}>
        <Segment
          basic
          className="contentHeader"
          style={{ marginBottom: "0px" }}
        >
          <SettingChange
            viewByCheckBox={viewByCheckBox}
            setViewByCheckBox={setViewByCheckBox}
            changeUserCheckBoxConfigurationFunction={
              changeUserCheckBoxConfigurationFunction
            }
          />
          <PaginationComp
            pagination={pagination}
            activePage={activePage}
            pageChange={pageChange}
          />
          <AddAndChange
            addCharacter={addCharacter}
            applyChanges={applyChanges}
          />
        </Segment>
        <Segment basic style={{ backgroundColor: "dimgray", marginTop: "0px" }}>
          <Grid columns={limit + 1}>
            <Grid.Row
              style={{
                borderBottom: !showNote && "0.05rem inset ivory",
              }}
            >
              <Grid.Column className="contentColumn">
                <AlarmAndNote
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
                  activePage={activePage}
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
                  />
                ))}
              </Grid.Row>
            )}
            <Grid.Row className="eachRow">
              <Grid.Column className="contentColumn">
                <Icon name="calendar check outline" />
                ???????????????
              </Grid.Column>
              {userTodoData.map((item, idx) => (
                <RestValue
                  item={item}
                  userTodoData={userTodoData}
                  setUserTodoData={setUserTodoData}
                />
              ))}
            </Grid.Row>
            {Array.from([
              "???????????????",
              "???????????????",
              "?????????",
              "???????????????",
            ]).map((item, idx) => (
              <DungeonAndEpona
                content={item}
                userTodoData={userTodoData}
                setUserTodoData={setUserTodoData}
                viewByCheckBox={viewByCheckBox}
              />
            ))}

            {Array.from([
              "?????????6???",
              "??????3???",
              "?????????2???",
              "????????????",
              "??????",
              "????????????",
              "???????????????",
              "???????????????",
            ]).map((item, idx) => (
              <WeeklyRaidContents
                content={item}
                userTodoData={userTodoData}
                setUserTodoData={setUserTodoData}
                viewByCheckBox={viewByCheckBox}
              />
            ))}

            {/* ????????? ?????? ???????????? ??? ????????? ????????? ?????? */}
            {/* <Grid.Row className="eachRow">
                    <Grid.Column className="contentColumn">
                      <div>
                        <Image
                          src="./images/loa_icons/abyssWeekly.png"
                          avatar
                          className="contentImage"
                        />
                        <span>??????????????????</span>
                      </div>
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <AbyssRaid
                        idx={idx}
                        abyssRaidItem={item}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row>
                  <Grid.Row className="eachRow">
                    <Grid.Column className="contentColumn">
                      <div>
                        <Image
                          src="./images/loa_icons/rehearsal.png"
                          avatar
                          className="contentImage"
                        />
                        <span>?????????, ?????????</span>
                      </div>
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <RehearsalAndDejavu
                        rehearsalAndDejavuItem={item}
                        idx={idx}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row> */}
          </Grid>
        </Segment>
      </Grid.Column>
    </Container>
  </Grid>
</Segment>;
