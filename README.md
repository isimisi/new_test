# Introduction

# Files and Folder Structure

📦.vscode
 ┣ 📜i18n-ally-reviews.yml
 ┣ 📜launch.json
 ┗ 📜settings.json
📦app
 ┣ 📂api
 ┃ ┣ 📂dummy
 ┃ ┃ ┣ 📜brand.ts
 ┃ ┃ ┣ 📜guideData.js
 ┃ ┃ ┗ 📜newsData.js
 ┃ ┣ 📂icons
 ┃ ┃ ┣ 📜ion-icon-js.js
 ┃ ┃ ┣ 📜ion-icon.txt
 ┃ ┃ ┗ 📜material-icon.txt
 ┃ ┣ 📂localStorage
 ┃ ┃ ┗ 📜localStorage.ts
 ┃ ┣ 📂palette
 ┃ ┃ ┣ 📜colorfull.js
 ┃ ┃ ┗ 📜themePalette.js
 ┃ ┣ 📂socket
 ┃ ┃ ┣ 📜SocketConnection.ts
 ┃ ┃ ┗ 📜protocol.js
 ┃ ┣ 📂ui
 ┃ ┃ ┣ 📜colors.ts
 ┃ ┃ ┣ 📜helper.js
 ┃ ┃ ┣ 📜link.js
 ┃ ┃ ┣ 📜menu.js
 ┃ ┃ ┗ 📜notifMessage.js
 ┃ ┣ 📜.DS_Store
 ┃ ┗ 📜constants.ts
 ┣ 📂components
 ┃ ┣ 📂Alerts
 ┃ ┃ ┣ 📜AlertLog.js
 ┃ ┃ ┗ 📜AlertModal.js
 ┃ ┣ 📂BreadCrumb
 ┃ ┃ ┣ 📜BreadCrumb.js
 ┃ ┃ ┗ 📜breadCrumb-jss.js
 ┃ ┣ 📂CardPaper
 ┃ ┃ ┣ 📜GroupCard.js
 ┃ ┃ ┣ 📜HorizontalNewsCard.js
 ┃ ┃ ┣ 📜PricingCard.js
 ┃ ┃ ┗ 📜cardStyle-jss.js
 ┃ ┣ 📂Condition
 ┃ ┃ ┣ 📂Edge
 ┃ ┃ ┃ ┣ 📜DefineEdge.js
 ┃ ┃ ┃ ┗ 📜EdgeForm.js
 ┃ ┃ ┣ 📂Node
 ┃ ┃ ┃ ┣ 📜DefineNode.js
 ┃ ┃ ┃ ┗ 📜NodeForm.js
 ┃ ┃ ┣ 📜ChooseConditions.js
 ┃ ┃ ┣ 📜ConditionFabs.js
 ┃ ┃ ┣ 📜ConditionForm.js
 ┃ ┃ ┣ 📜ConditionMeta.js
 ┃ ┃ ┗ 📜condition-jss.js
 ┃ ┣ 📂Counter
 ┃ ┃ ┗ 📜CounterWidget.js
 ┃ ┣ 📂DataGrid
 ┃ ┃ ┣ 📜GridCellExpanded.tsx
 ┃ ┃ ┗ 📜GridCellExpandedWYS.tsx
 ┃ ┣ 📂DialogModal
 ┃ ┃ ┗ 📜CvrDialog.js
 ┃ ┣ 📂Divider
 ┃ ┃ ┣ 📜divider-jss.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂Document
 ┃ ┃ ┣ 📜DocumentForm.tsx
 ┃ ┃ ┣ 📜UploadForm.tsx
 ┃ ┃ ┗ 📜document-jss.ts
 ┃ ┣ 📂Error
 ┃ ┃ ┣ 📜CrashScreen.tsx
 ┃ ┃ ┣ 📜ErrorWrap.tsx
 ┃ ┃ ┗ 📜error.jss.ts
 ┃ ┣ 📂FileUpload
 ┃ ┃ ┗ 📜FileUpload.js
 ┃ ┣ 📂Flow
 ┃ ┃ ┣ 📂Actions
 ┃ ┃ ┃ ┣ 📜Collaborations.tsx
 ┃ ┃ ┃ ┣ 📜Controls.tsx
 ┃ ┃ ┃ ┣ 📜Items.tsx
 ┃ ┃ ┃ ┣ 📜Meta.tsx
 ┃ ┃ ┃ ┣ 📜Shortcuts.tsx
 ┃ ┃ ┃ ┣ 📜Views.tsx
 ┃ ┃ ┃ ┗ 📜actions.jss.tsx
 ┃ ┃ ┗ 📂Share
 ┃ ┃ ┃ ┣ 📜ShareForm.js
 ┃ ┃ ┃ ┗ 📜ShareModal.js
 ┃ ┣ 📂Forms
 ┃ ┃ ┣ 📂helpers
 ┃ ┃ ┃ ┗ 📜helpers.js
 ┃ ┃ ┣ 📜AlertNamingForm.tsx
 ┃ ┃ ┣ 📜ConditionNamingForm.js
 ┃ ┃ ┣ 📜GroupForm.js
 ┃ ┃ ┣ 📜LockForm.tsx
 ┃ ┃ ┣ 📜LoginForm.tsx
 ┃ ┃ ┣ 📜NewPasswordForm.js
 ┃ ┃ ┣ 📜NodeForm.js
 ┃ ┃ ┣ 📜OutputForm.js
 ┃ ┃ ┣ 📜OutputNamingForm.tsx
 ┃ ┃ ┣ 📜ReduxFormMUI.js
 ┃ ┃ ┣ 📜RegisterForm.js
 ┃ ┃ ┣ 📜RelationshipForm.js
 ┃ ┃ ┣ 📜ResetForm.js
 ┃ ┃ ┣ 📜lock.json
 ┃ ┃ ┣ 📜user-jss.js
 ┃ ┃ ┗ 📜word.json
 ┃ ┣ 📂Group
 ┃ ┃ ┣ 📜GroupDetail.js
 ┃ ┃ ┣ 📜GroupGallery.js
 ┃ ┃ ┣ 📜GroupModal.js
 ┃ ┃ ┗ 📜group-jss.js
 ┃ ┣ 📂GuideSlider
 ┃ ┃ ┣ 📜guide-jss.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂Header
 ┃ ┃ ┣ 📜CreateNotificationDialog.tsx
 ┃ ┃ ┣ 📜DashboardSelector.tsx
 ┃ ┃ ┣ 📜DropListMenu.js
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┣ 📜HeaderMenu.js
 ┃ ┃ ┣ 📜MegaMenu.js
 ┃ ┃ ┣ 📜NotificationDialog.tsx
 ┃ ┃ ┣ 📜UserMenu.tsx
 ┃ ┃ ┗ 📜header-jss.js
 ┃ ┣ 📂LanguageSelector
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Loading
 ┃ ┃ ┣ 📜LongLoader.tsx
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂Lookup
 ┃ ┃ ┣ 📜Acconting.tsx
 ┃ ┃ ┣ 📜Diagram.tsx
 ┃ ┃ ┣ 📜Directors.tsx
 ┃ ┃ ┣ 📜InfoPaper.tsx
 ┃ ┃ ┣ 📜MasterData.tsx
 ┃ ┃ ┣ 📜Owners.tsx
 ┃ ┃ ┣ 📜Timeline.tsx
 ┃ ┃ ┗ 📜lookup.jss.ts
 ┃ ┣ 📂NoContent
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Nodes
 ┃ ┃ ┣ 📜NodeDemo.js
 ┃ ┃ ┗ 📜NodeStyling.js
 ┃ ┣ 📂Notification
 ┃ ┃ ┗ 📜Notification.tsx
 ┃ ┣ 📂Panel
 ┃ ┃ ┣ 📜FloatingPanel.js
 ┃ ┃ ┗ 📜panel-jss.js
 ┃ ┣ 📂PapperBlock
 ┃ ┃ ┣ 📜PapperBlock.js
 ┃ ┃ ┗ 📜papperStyle-jss.js
 ┃ ┣ 📂Person
 ┃ ┃ ┣ 📜PersonForm.tsx
 ┃ ┃ ┗ 📜person-jss.ts
 ┃ ┣ 📂Plans
 ┃ ┃ ┣ 📜PaymentForm.js
 ┃ ┃ ┣ 📜PaymentPanel.js
 ┃ ┃ ┣ 📜plan-jss.js
 ┃ ┃ ┗ 📜styles.css
 ┃ ┣ 📂Relationships
 ┃ ┃ ┣ 📜RelationshipDemo.js
 ┃ ┃ ┗ 📜RelationshipStylling.js
 ┃ ┣ 📂Search
 ┃ ┃ ┣ 📜.DS_Store
 ┃ ┃ ┣ 📜SearchGroup.js
 ┃ ┃ ┣ 📜SearchUi.js
 ┃ ┃ ┗ 📜search-jss.js
 ┃ ┣ 📂Sidebar
 ┃ ┃ ┣ 📜MainMenu.tsx
 ┃ ┃ ┣ 📜SidebarContent.tsx
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜sidebar-jss.ts
 ┃ ┣ 📂Switch
 ┃ ┃ ┣ 📜CustomSwitch.tsx
 ┃ ┃ ┗ 📜CustomSwitchFlow.tsx
 ┃ ┣ 📂Tabs
 ┃ ┃ ┗ 📜TabPanel.tsx
 ┃ ┣ 📂Tags
 ┃ ┃ ┣ 📂reducers
 ┃ ┃ ┃ ┣ 📜tagsActions.ts
 ┃ ┃ ┃ ┣ 📜tagsConstants.ts
 ┃ ┃ ┃ ┗ 📜tagsReducer.ts
 ┃ ┃ ┣ 📜CreateTag.tsx
 ┃ ┃ ┣ 📜TagList.tsx
 ┃ ┃ ┣ 📜constants.tsx
 ┃ ┃ ┗ 📜tag.jss.tsx
 ┃ ┣ 📂Timeline
 ┃ ┃ ┣ 📂Drawer
 ┃ ┃ ┃ ┣ 📜Content.tsx
 ┃ ┃ ┃ ┗ 📜Table.tsx
 ┃ ┃ ┣ 📂Edges
 ┃ ┃ ┃ ┗ 📜EdgeWithButton.tsx
 ┃ ┃ ┣ 📂Modals
 ┃ ┃ ┃ ┣ 📜CreateElement.tsx
 ┃ ┃ ┃ ┣ 📜Document.tsx
 ┃ ┃ ┃ ┣ 📜Email.tsx
 ┃ ┃ ┃ ┣ 📜GoThroughSplit.tsx
 ┃ ┃ ┃ ┣ 📜ImportEmails.tsx
 ┃ ┃ ┃ ┣ 📜Person.tsx
 ┃ ┃ ┃ ┗ 📜ValidateEmails.tsx
 ┃ ┃ ┣ 📂Nodes
 ┃ ┃ ┃ ┣ 📜AddItemNode.tsx
 ┃ ┃ ┃ ┣ 📜HorizontalNode.tsx
 ┃ ┃ ┃ ┗ 📜VerticalNode.tsx
 ┃ ┃ ┣ 📂Util
 ┃ ┃ ┃ ┣ 📂ElementPicker
 ┃ ┃ ┃ ┃ ┣ 📜element-overlay.ts
 ┃ ┃ ┃ ┃ ┣ 📜element-picker.ts
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜utils.ts
 ┃ ┃ ┃ ┣ 📜CreateForm.tsx
 ┃ ┃ ┃ ┗ 📜Email.tsx
 ┃ ┃ ┗ 📜timeline.jss.ts
 ┃ ┣ 📂User
 ┃ ┃ ┣ 📜SendResetPassword.js
 ┃ ┃ ┗ 📜lock.json
 ┃ ┣ 📂Widget
 ┃ ┃ ┣ 📜CounterIconsWidget.js
 ┃ ┃ ┣ 📜NewsListWidget.js
 ┃ ┃ ┣ 📜TimelineWidget.js
 ┃ ┃ ┗ 📜widget-jss.js
 ┃ ┣ 📂Workspace
 ┃ ┃ ┣ 📂Analysis
 ┃ ┃ ┃ ┣ 📜MiniFlow.js
 ┃ ┃ ┃ ┣ 📜SidePanel.tsx
 ┃ ┃ ┃ ┗ 📜analysis.jss.tsx
 ┃ ┃ ┣ 📂CompanyData
 ┃ ┃ ┃ ┣ 📜AccountingTop.tsx
 ┃ ┃ ┃ ┣ 📜CompanyDataModel.js
 ┃ ┃ ┃ ┗ 📜Timeline.tsx
 ┃ ┃ ┣ 📂ContextMenu
 ┃ ┃ ┃ ┣ 📜EdgeContextMenu.tsx
 ┃ ┃ ┃ ┣ 📜NodeContextMenu.tsx
 ┃ ┃ ┃ ┣ 📜PaneContextMenu.tsx
 ┃ ┃ ┃ ┣ 📜SelectionContextMenu.tsx
 ┃ ┃ ┃ ┗ 📜menu.jss.tsx
 ┃ ┃ ┣ 📂Edge
 ┃ ┃ ┃ ┣ 📜CustomConnectionLine.tsx
 ┃ ┃ ┃ ┣ 📜CustomEdge.tsx
 ┃ ┃ ┃ ┣ 📜DefineEdge.js
 ┃ ┃ ┃ ┣ 📜EdgeForm.js
 ┃ ┃ ┃ ┣ 📜Popper.tsx
 ┃ ┃ ┃ ┣ 📜beizerCurve.svg
 ┃ ┃ ┃ ┣ 📜smoothStep.svg
 ┃ ┃ ┃ ┗ 📜straightLine.svg
 ┃ ┃ ┣ 📂Modals
 ┃ ┃ ┃ ┣ 📜AddressInfoModel.js
 ┃ ┃ ┃ ┣ 📜InternationalStructureAlert.tsx
 ┃ ┃ ┃ ┣ 📜MapTypesForErst.js
 ┃ ┃ ┃ ┣ 📜RelationshipModal.tsx
 ┃ ┃ ┃ ┣ 📜SignWorkspace.js
 ┃ ┃ ┃ ┣ 📜UncertainCompanies.js
 ┃ ┃ ┃ ┣ 📜WorkspaceForm.tsx
 ┃ ┃ ┃ ┗ 📜WorkspaceMeta.js
 ┃ ┃ ┣ 📂Node
 ┃ ┃ ┃ ┣ 📜ContentEditable.js
 ┃ ┃ ┃ ┣ 📜ControlPoint.tsx
 ┃ ┃ ┃ ┣ 📜CustomNode.tsx
 ┃ ┃ ┃ ┣ 📜DefineNode.tsx
 ┃ ┃ ┃ ┣ 📜Popper.tsx
 ┃ ┃ ┃ ┣ 📜StepNode.tsx
 ┃ ┃ ┃ ┣ 📜StickyNoteNode.js
 ┃ ┃ ┃ ┣ 📜WorkspaceNodeForm.js
 ┃ ┃ ┃ ┣ 📜circle.svg
 ┃ ┃ ┃ ┣ 📜person.svg
 ┃ ┃ ┃ ┣ 📜square.svg
 ┃ ┃ ┃ ┗ 📜triangle.svg
 ┃ ┃ ┣ 📂Public
 ┃ ┃ ┃ ┣ 📜PublicWorkspace.tsx
 ┃ ┃ ┃ ┗ 📜WorkspaceFabs.js
 ┃ ┃ ┗ 📜workspace-jss.js
 ┃ ┣ 📜.DS_Store
 ┃ ┗ 📜index.ts
 ┣ 📂containers
 ┃ ┣ 📂App
 ┃ ┃ ┣ 📜Application.tsx
 ┃ ┃ ┣ 📜PrivateRoute.tsx
 ┃ ┃ ┣ 📜PublicRoute.js
 ┃ ┃ ┣ 📜PublicRoutes.js
 ┃ ┃ ┣ 📜ThemeWrapper.js
 ┃ ┃ ┣ 📜auth0-provider-with-history.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Pages
 ┃ ┃ ┣ 📂Alerts
 ┃ ┃ ┃ ┣ 📂reducers
 ┃ ┃ ┃ ┃ ┣ 📜alertActions.ts
 ┃ ┃ ┃ ┃ ┣ 📜alertConstants.ts
 ┃ ┃ ┃ ┃ ┗ 📜alertReducer.ts
 ┃ ┃ ┃ ┣ 📜Alert.tsx
 ┃ ┃ ┃ ┣ 📜alert-jss.ts
 ┃ ┃ ┃ ┣ 📜constants.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Attributes
 ┃ ┃ ┃ ┣ 📂reducers
 ┃ ┃ ┃ ┃ ┣ 📜attributeActions.ts
 ┃ ┃ ┃ ┃ ┣ 📜attributeConstants.ts
 ┃ ┃ ┃ ┃ ┗ 📜attributeReducer.ts
 ┃ ┃ ┃ ┣ 📜Attribute.js
 ┃ ┃ ┃ ┣ 📜attribute-jss.js
 ┃ ┃ ┃ ┣ 📜constants.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Avatar
 ┃ ┃ ┃ ┣ 📂AvatarEditor
 ┃ ┃ ┃ ┃ ┣ 📂SectionWrapper
 ┃ ┃ ┃ ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┣ 📂AvatarList
 ┃ ┃ ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┣ 📂ear
 ┃ ┃ ┃ ┃ ┣ 📜big.tsx
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜small.tsx
 ┃ ┃ ┃ ┣ 📂eyebrow
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┣ 📜up.tsx
 ┃ ┃ ┃ ┃ ┗ 📜upWoman.tsx
 ┃ ┃ ┃ ┣ 📂eyes
 ┃ ┃ ┃ ┃ ┣ 📜circle.tsx
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┣ 📜oval.tsx
 ┃ ┃ ┃ ┃ ┗ 📜smile.tsx
 ┃ ┃ ┃ ┣ 📂face
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┣ 📂glasses
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┣ 📜round.tsx
 ┃ ┃ ┃ ┃ ┗ 📜square.tsx
 ┃ ┃ ┃ ┣ 📂hair
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┣ 📜mohawk.tsx
 ┃ ┃ ┃ ┃ ┣ 📜normal.tsx
 ┃ ┃ ┃ ┃ ┣ 📜thick.tsx
 ┃ ┃ ┃ ┃ ┣ 📜womanLong.tsx
 ┃ ┃ ┃ ┃ ┗ 📜womanShort.tsx
 ┃ ┃ ┃ ┣ 📂hat
 ┃ ┃ ┃ ┃ ┣ 📜beanie.tsx
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜turban.tsx
 ┃ ┃ ┃ ┣ 📂mouth
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┣ 📜laugh.tsx
 ┃ ┃ ┃ ┃ ┣ 📜peace.tsx
 ┃ ┃ ┃ ┃ ┗ 📜smile.tsx
 ┃ ┃ ┃ ┣ 📂nose
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┣ 📜long.tsx
 ┃ ┃ ┃ ┃ ┣ 📜round.tsx
 ┃ ┃ ┃ ┃ ┗ 📜short.tsx
 ┃ ┃ ┃ ┣ 📂shirt
 ┃ ┃ ┃ ┃ ┣ 📜hoody.tsx
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┣ 📜polo.tsx
 ┃ ┃ ┃ ┃ ┗ 📜short.tsx
 ┃ ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂ComingSoon
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Conditions
 ┃ ┃ ┃ ┣ 📂reducers
 ┃ ┃ ┃ ┃ ┣ 📜conditionActions.ts
 ┃ ┃ ┃ ┃ ┣ 📜conditionConstants.ts
 ┃ ┃ ┃ ┃ ┗ 📜conditionReducer.ts
 ┃ ┃ ┃ ┣ 📜Condition.tsx
 ┃ ┃ ┃ ┣ 📜conditions-jss.js
 ┃ ┃ ┃ ┣ 📜constants.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂CreateOrganization
 ┃ ┃ ┃ ┣ 📂reducers
 ┃ ┃ ┃ ┃ ┣ 📜createOrganizationActions.ts
 ┃ ┃ ┃ ┃ ┣ 📜createOrganizationConstants.ts
 ┃ ┃ ┃ ┃ ┗ 📜createOrganizationReducer.ts
 ┃ ┃ ┃ ┣ 📜ChoosePlan.tsx
 ┃ ┃ ┃ ┗ 📜createOrganization-jss.js
 ┃ ┃ ┣ 📂Dashboard
 ┃ ┃ ┃ ┣ 📂reducers
 ┃ ┃ ┃ ┃ ┣ 📜dashboardActions.ts
 ┃ ┃ ┃ ┃ ┣ 📜dashboardConstants.ts
 ┃ ┃ ┃ ┃ ┗ 📜dashboardReducer.ts
 ┃ ┃ ┃ ┣ 📜MobileDisclaimer.tsx
 ┃ ┃ ┃ ┣ 📜PersonalDashboard.tsx
 ┃ ┃ ┃ ┣ 📜UpgradeModal.tsx
 ┃ ┃ ┃ ┣ 📜dashboard-jss.ts
 ┃ ┃ ┃ ┗ 📜printer.json
 ┃ ┃ ┣ 📂Documents
 ┃ ┃ ┃ ┣ 📂reducers
 ┃ ┃ ┃ ┃ ┣ 📜documentActions.ts
 ┃ ┃ ┃ ┃ ┣ 📜documentConstants.ts
 ┃ ┃ ┃ ┃ ┗ 📜documentReducer.ts
 ┃ ┃ ┃ ┣ 📜Document.tsx
 ┃ ┃ ┃ ┣ 📜constants.tsx
 ┃ ┃ ┃ ┣ 📜document-jss.ts
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Error
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Groups
 ┃ ┃ ┃ ┣ 📂reducers
 ┃ ┃ ┃ ┃ ┣ 📜groupActions.ts
 ┃ ┃ ┃ ┃ ┣ 📜groupConstants.ts
 ┃ ┃ ┃ ┃ ┗ 📜groupReducer.ts
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂HelpSupport
 ┃ ┃ ┃ ┣ 📜ContactForm.js
 ┃ ┃ ┃ ┣ 📜Qna.js
 ┃ ┃ ┃ ┣ 📜helpSupport-jss.js
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Lookup
 ┃ ┃ ┃ ┣ 📂reducers
 ┃ ┃ ┃ ┃ ┣ 📜lookupActions.ts
 ┃ ┃ ┃ ┃ ┣ 📜lookupConstants.ts
 ┃ ┃ ┃ ┃ ┗ 📜lookupReducer.ts
 ┃ ┃ ┃ ┣ 📜Details.tsx
 ┃ ┃ ┃ ┣ 📜constants.tsx
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜lookup-jss.ts
 ┃ ┃ ┣ 📂Nodes
 ┃ ┃ ┃ ┣ 📂reducers
 ┃ ┃ ┃ ┃ ┣ 📜nodeActions.ts
 ┃ ┃ ┃ ┃ ┣ 📜nodeConstants.ts
 ┃ ┃ ┃ ┃ ┗ 📜nodeReducer.ts
 ┃ ┃ ┃ ┣ 📜Node.tsx
 ┃ ┃ ┃ ┣ 📜constants.tsx
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜node-jss.ts
 ┃ ┃ ┣ 📂NotFound
 ┃ ┃ ┃ ┗ 📜NotFound.js
 ┃ ┃ ┣ 📂Outputs
 ┃ ┃ ┃ ┣ 📂reducers
 ┃ ┃ ┃ ┃ ┣ 📜outputActions.ts
 ┃ ┃ ┃ ┃ ┣ 📜outputConstants.ts
 ┃ ┃ ┃ ┃ ┗ 📜outputReducer.ts
 ┃ ┃ ┃ ┣ 📜Output.tsx
 ┃ ┃ ┃ ┣ 📜constants.tsx
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜output-jss.tsx
 ┃ ┃ ┣ 📂Persons
 ┃ ┃ ┃ ┣ 📂reducers
 ┃ ┃ ┃ ┃ ┣ 📜personActions.ts
 ┃ ┃ ┃ ┃ ┣ 📜personConstants.ts
 ┃ ┃ ┃ ┃ ┗ 📜personReducer.ts
 ┃ ┃ ┃ ┣ 📜Person.tsx
 ┃ ┃ ┃ ┣ 📜constants.tsx
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜person-jss.ts
 ┃ ┃ ┣ 📂Relationships
 ┃ ┃ ┃ ┣ 📂reducers
 ┃ ┃ ┃ ┃ ┣ 📜relationshipActions.ts
 ┃ ┃ ┃ ┃ ┣ 📜relationshipConstants.ts
 ┃ ┃ ┃ ┃ ┗ 📜relationshipReducer.ts
 ┃ ┃ ┃ ┣ 📜Relationship.tsx
 ┃ ┃ ┃ ┣ 📜constants.tsx
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜relationship-jss.ts
 ┃ ┃ ┣ 📂Settings
 ┃ ┃ ┃ ┣ 📜DetailSettings.js
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┗ 📜settings-jss.js
 ┃ ┃ ┣ 📂Timelines
 ┃ ┃ ┃ ┣ 📂reducers
 ┃ ┃ ┃ ┃ ┣ 📜timelineActions.ts
 ┃ ┃ ┃ ┃ ┣ 📜timelineConstants.ts
 ┃ ┃ ┃ ┃ ┗ 📜timelineReducer.ts
 ┃ ┃ ┃ ┣ 📜Timeline.tsx
 ┃ ┃ ┃ ┣ 📜constants.tsx
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┣ 📜timeline-jss.ts
 ┃ ┃ ┃ ┗ 📜timeline.css
 ┃ ┃ ┣ 📂Workspaces
 ┃ ┃ ┃ ┣ 📂reducers
 ┃ ┃ ┃ ┃ ┣ 📜workspaceActions.ts
 ┃ ┃ ┃ ┃ ┣ 📜workspaceConstants.ts
 ┃ ┃ ┃ ┃ ┗ 📜workspaceReducer.ts
 ┃ ┃ ┃ ┣ 📜KoncernDiagram.tsx
 ┃ ┃ ┃ ┣ 📜PublicWorkspace.tsx
 ┃ ┃ ┃ ┣ 📜Workspace.tsx
 ┃ ┃ ┃ ┣ 📜WorkspaceAnalysis.tsx
 ┃ ┃ ┃ ┣ 📜constants.tsx
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┣ 📜workspace-jss.js
 ┃ ┃ ┃ ┗ 📜workspace.css
 ┃ ┃ ┗ 📜.DS_Store
 ┃ ┣ 📂Parent
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂Templates
 ┃ ┃ ┣ 📂layouts
 ┃ ┃ ┃ ┣ 📜DropMenuLayout.js
 ┃ ┃ ┃ ┣ 📜LeftSidebarBigLayout.js
 ┃ ┃ ┃ ┣ 📜LeftSidebarLayout.js
 ┃ ┃ ┃ ┣ 📜MegaMenuLayout.js
 ┃ ┃ ┃ ┗ 📜RightSidebarLayout.js
 ┃ ┃ ┣ 📜.DS_Store
 ┃ ┃ ┣ 📜Corporate.js
 ┃ ┃ ┣ 📜Creative.js
 ┃ ┃ ┣ 📜Dashboard.js
 ┃ ┃ ┣ 📜Decoration.js
 ┃ ┃ ┣ 📜Outer.js
 ┃ ┃ ┗ 📜appStyles-jss.js
 ┃ ┣ 📜.DS_Store
 ┃ ┗ 📜pageListAsync.js
 ┣ 📂helpers
 ┃ ┣ 📂export
 ┃ ┃ ┗ 📜handleExport.tsx
 ┃ ┣ 📂flow
 ┃ ┃ ┣ 📂language
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┗ 📜dragHelper.ts
 ┃ ┣ 📂numbers
 ┃ ┃ ┗ 📜Formatters.tsx
 ┃ ┣ 📜countryOptions.tsx
 ┃ ┣ 📜fullScreen.js
 ┃ ┣ 📜tableOptions.tsx
 ┃ ┗ 📜userInfo.ts
 ┣ 📂hooks
 ┃ ┣ 📂flow
 ┃ ┃ ┣ 📜doubbleClick.ts
 ┃ ┃ ┣ 📜flowContexts.ts
 ┃ ┃ ┗ 📜itemPanel.ts
 ┃ ┣ 📂timeline
 ┃ ┃ ┗ 📜drawerWidth.tsx
 ┃ ┣ 📜redux.ts
 ┃ ┣ 📜useContextMenu.tsx
 ┃ ┣ 📜useCutCopyPaste.js
 ┃ ┣ 📜useWindowDiemensions.tsx
 ┃ ┗ 📜useWorkspaceHotKeys.tsx
 ┣ 📂redux
 ┃ ┣ 📂actions
 ┃ ┃ ┣ 📜reduxFormActions.js
 ┃ ┃ ┗ 📜uiActions.js
 ┃ ┣ 📂constants
 ┃ ┃ ┣ 📜notifConstants.ts
 ┃ ┃ ┣ 📜reduxFormConstants.js
 ┃ ┃ ┗ 📜uiConstants.js
 ┃ ┣ 📂modules
 ┃ ┃ ┣ 📜initForm.ts
 ┃ ┃ ┗ 📜ui.ts
 ┃ ┣ 📜.DS_Store
 ┃ ┣ 📜autoMergeLevel2Immutable.js
 ┃ ┣ 📜configureStore.ts
 ┃ ┗ 📜reducers.ts
 ┣ 📂styles
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂vendors
 ┃ ┃ ┃ ┣ 📂image-lightbox
 ┃ ┃ ┃ ┃ ┗ 📜image-lightbox.css
 ┃ ┃ ┃ ┣ 📂invoice
 ┃ ┃ ┃ ┃ ┗ 📜style.css
 ┃ ┃ ┃ ┣ 📂react-animated-slider
 ┃ ┃ ┃ ┃ ┗ 📜react-animated-slider.css
 ┃ ┃ ┃ ┣ 📂react-big-calendar
 ┃ ┃ ┃ ┃ ┗ 📜react-big-calendar.css
 ┃ ┃ ┃ ┣ 📂react-calculator
 ┃ ┃ ┃ ┃ ┣ 📜flex.css
 ┃ ┃ ┃ ┃ ┗ 📜styles.css
 ┃ ┃ ┃ ┣ 📂react-clock
 ┃ ┃ ┃ ┃ ┗ 📜react-clock.css
 ┃ ┃ ┃ ┣ 📂react-draft-wysiwyg
 ┃ ┃ ┃ ┃ ┗ 📜react-draft-wysiwyg.css
 ┃ ┃ ┃ ┣ 📂react-dropzone
 ┃ ┃ ┃ ┃ ┗ 📜react-dropzone.css
 ┃ ┃ ┃ ┣ 📂react-input-range
 ┃ ┃ ┃ ┃ ┗ 📜react-input-range.css
 ┃ ┃ ┃ ┣ 📂react-weather
 ┃ ┃ ┃ ┃ ┗ 📜GenericWeather.css
 ┃ ┃ ┃ ┣ 📂rechart
 ┃ ┃ ┃ ┃ ┗ 📜styles.css
 ┃ ┃ ┃ ┣ 📂select
 ┃ ┃ ┃ ┃ ┗ 📜select.css
 ┃ ┃ ┃ ┣ 📂slick-carousel
 ┃ ┃ ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜slick.eot
 ┃ ┃ ┃ ┃ ┃ ┣ 📜slick.svg
 ┃ ┃ ┃ ┃ ┃ ┣ 📜slick.ttf
 ┃ ┃ ┃ ┃ ┃ ┗ 📜slick.woff
 ┃ ┃ ┃ ┃ ┣ 📜ajax-loader.gif
 ┃ ┃ ┃ ┃ ┣ 📜slick-carousel.css
 ┃ ┃ ┃ ┃ ┣ 📜slick-theme.css
 ┃ ┃ ┃ ┃ ┗ 📜slick.css
 ┃ ┃ ┃ ┗ 📜.DS_Store
 ┃ ┃ ┣ 📜.DS_Store
 ┃ ┃ ┗ 📜Form.scss
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜_buttons.scss
 ┃ ┃ ┣ 📜_forms.scss
 ┃ ┃ ┣ 📜_layout.scss
 ┃ ┃ ┣ 📜_lists.scss
 ┃ ┃ ┣ 📜_media.scss
 ┃ ┃ ┣ 📜_tables.scss
 ┃ ┃ ┣ 📜_typography.scss
 ┃ ┃ ┣ 📜_variables.scss
 ┃ ┃ ┗ 📜base.scss
 ┃ ┣ 📂mixins
 ┃ ┃ ┣ 📜bourbon.scss
 ┃ ┃ ┣ 📜neat.scss
 ┃ ┃ ┗ 📜pallete.scss
 ┃ ┣ 📂theme
 ┃ ┃ ┗ 📜applicationTheme.js
 ┃ ┣ 📂variables
 ┃ ┃ ┣ 📜bitters.scss
 ┃ ┃ ┣ 📜custom_pallete.scss
 ┃ ┃ ┗ 📜neat.scss
 ┃ ┣ 📜.DS_Store
 ┃ ┣ 📜mixins.scss
 ┃ ┗ 📜variables.scss
 ┣ 📂translations
 ┃ ┣ 📜dk.json
 ┃ ┗ 📜en.json
 ┣ 📂types
 ┃ ┣ 📂reducers
 ┃ ┃ ┣ 📜alert.ts
 ┃ ┃ ┣ 📜attribute.ts
 ┃ ┃ ┣ 📜conditions.ts
 ┃ ┃ ┣ 📜dashbord.ts
 ┃ ┃ ┣ 📜document.ts
 ┃ ┃ ┣ 📜groups.ts
 ┃ ┃ ┣ 📜lookup.ts
 ┃ ┃ ┣ 📜node.ts
 ┃ ┃ ┣ 📜output.ts
 ┃ ┃ ┣ 📜person.ts
 ┃ ┃ ┣ 📜relationship.ts
 ┃ ┃ ┣ 📜tags.ts
 ┃ ┃ ┣ 📜timeline.ts
 ┃ ┃ ┗ 📜workspace.ts
 ┃ ┣ 📜data.ts
 ┃ ┣ 📜global.d.ts
 ┃ ┣ 📜immutable.ts
 ┃ ┣ 📜reactFlow.ts
 ┃ ┗ 📜styling.ts
 ┣ 📂utils
 ┃ ┣ 📜history.js
 ┃ ┣ 📜loadable.js
 ┃ ┗ 📜request.js
 ┣ 📜.DS_Store
 ┣ 📜.htaccess
 ┣ 📜.nginx.conf
 ┣ 📜app.tsx
 ┣ 📜i18n.js
 ┗ 📜index.html
 📦auth0
 ┣ 📂db
 ┃ ┣ 📜change_password.js
 ┃ ┣ 📜create.js
 ┃ ┣ 📜delete.js
 ┃ ┣ 📜get_user.js
 ┃ ┣ 📜login.js
 ┃ ┗ 📜verify.js
 ┣ 📂rules
 ┃ ┗ 📜add_meta_data.js
 ┣ 📜login.html
 ┗ 📜password_reset.html
 📦internals
 ┣ 📂scripts
 ┃ ┣ 📂helpers
 ┃ ┃ ┣ 📜checkmark.js
 ┃ ┃ ┣ 📜progress.js
 ┃ ┃ ┗ 📜xmark.js
 ┃ ┣ 📜analyze.js
 ┃ ┣ 📜clean.js
 ┃ ┣ 📜dependencies.js
 ┃ ┣ 📜deploy.js
 ┃ ┣ 📜generate-templates-for-linting.js
 ┃ ┗ 📜npmcheckversion.js
 ┣ 📂webpack
 ┃ ┣ 📜webpack.base.babel.js
 ┃ ┣ 📜webpack.dev.babel.js
 ┃ ┣ 📜webpack.dll.babel.js
 ┃ ┗ 📜webpack.prod.babel.js
 ┗ 📜config.js
 📦internals
 ┣ 📂scripts
 ┃ ┣ 📂helpers
 ┣ 📂webpack
 ┗ 📜config.js
 📦public
 ┣ 📂favicons
 ┣ 📂images
 ┃ ┣ 📂avatars
 ┃ ┣ 📂countries
 ┃ ┣ 📂cursors
 ┃ ┣ 📂decoration
 ┃ ┣ 📂guide
 ┃ ┣ 📂icons
 ┃ ┣ 📂logo
 ┣ 📂lotties
 ┃ ┣ 📂racoon
 📦server
 ┣ 📂middlewares
 ┃ ┣ 📜addDevMiddlewares.js
 ┃ ┣ 📜addProdMiddlewares.js
 ┃ ┗ 📜frontendMiddleware.js
 ┣ 📜argv.js
 ┣ 📜index.js
 ┣ 📜logger.js
 ┣ 📜port.js
 ┣ 📜rawdocs.js
 ┗ 📜rawicons.js

# Installation and Running App

Juristic is built on top of [Material UI](https://material-ui.com/)

- Connect to the internet
- Install NodeJs from [NodeJs Official Page](https://nodejs.org/en/)
- Open Terminal
- Go to your file project
- **Install Modules**  
  Install module dependencies by run this script in terminal

  ```js
  npm install
  ```

  It will download some necessary dependencies, it could take some minutes, just wait until finish.

- **Build Webpack DLL dependencies(If necessary)**  
  Install module dependencies by run this script in terminal. This process ussualy done by 'npm install', but if system require it just run this command:

  ```js
  npm run build:dll
  ```

- **Run App**  
  After build static library, then run the app.

  ```js
  npm start
  ```

  The process should be take about 1-2 minutes.  
  ![process](https://ilhammeidi.github.io/dandelion-docs/images/cmd1.png)  
  \_INFO:

  - Just run this script whenever you want start the project.
  - Run `npm install` again if you have new module dependencies,  
    \_

- Navigate to [http://localhost:3005](http://localhost:3005/)

# Troublehooting

#### Installation Problem

- _if got warning like this :_

  ```js
  npm WARN redux-immutablejs@0.0.8 requires a peer of immutable@^3.7.5 but none is installed. You must install peer dependencies yourself.
  npm WARN react-draft-wysiwyg@1.12.13 requires a peer of immutable@3.x.x || 4.x.x but none is installed. You must install peer dependencies yourself.
  npm WARN slick-carousel@1.8.1 requires a peer of jquery@>=1.8.0 but none is installed. You must install peer dependencies yourself.
  npm WARN draftjs-utils@0.9.4 requires a peer of immutable@3.x.x || 4.x.x but none is installed. You must install peer dependencies yourself.
  npm WARN html-to-draftjs@1.4.0 requires a peer of immutable@3.x.x || 4.x.x but none is installed. You must install peer dependencies yourself.

  ```

  **Don't worry the app will run as well**

  For warning some of dependencies need another dependencies too, maybe once you install them, there’s some changes from the 3rd party vendor so probably it will make a warning to another dependencies.

- **Stuck on installation related node-pre-gyp. How to fix it?**  
  Here’s a case error when installation being stuck on node-pre-gyp node-pre-gyp WARN Using request for node-pre-gyp https download Please stop the installation process by press CTRL+C Then run npm install again.
- **Error SCSS or node-sass when NPM start. How to fix it?**

  ```js
  ERROR in ./app/styles/layout/base.scss (./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/lib/loader.js??ref--8-3!./app/styles/layout/base.scss)
  Module build failed (from ./node_modules/sass-loader/lib/loader.js):
  ```

  - It mean the node-sass not installed succesfully. May because connection problem, changed node environment during installation, or blocked node-sass repository
  - Please install node-sass manually by npm install node-sass --save
  - Build dll libraries npm run build:dll
  - Try to start project again npm start

- **Error warning at the first time npm install Module not found: Error: and ERROR in dll reactBoilerplateDeps. What that’s mean?**  
  Don’t worry for the errors when npm install or npm build:dll it’s warning messages because the webpack dll cannot go through inside those dependencies directory, some dependencies work for backend side (such as fs and moment module ) so that will not built in dll libraries. You can continue to start the project by run npm start or npm run start:prod (if production) and should work properly. If the program cannot running properly, please try to remove all module in node_modules/. Then install again with npm install.
  _FYI: The webpack dll itself use for optimizing building script. Here’s article about webpack dll https://medium.com/@emilycoco/how-to-use-the-dll-plugin-to-speed-up-your-webpack-build-dbf330d3b13c._
- _if got an error with a dependencies installation_. Try to remove the problematic package in `package.json`. Then install again with `npm install`. After finish try to install the problematic package manually.
- if still got an error. Try to update the problematic package instead.

#### Development Problem

Every code changes, the app will updated directly without reloading the pages. when errors happen or warning will show in browser and console browser.

# Basic Code Structure

#### Main HTML

The HTML root in `/app/index.html`
You can put google analytics, font icon, embeded fonts, etc here.

#### Main JS

The JS root in `/app/app.js`. This is the entry file for the application, only setup and boilerplate code.

#### Directory Alias

You can find directory alias settings in `/internals/webpack/webpack.base.babel.js`

| Name             | Directory    | Samle Use             | UI Components                                                                                           |
| ---------------- | ------------ | --------------------- | ------------------------------------------------------------------------------------------------------- |
| Pages            | @pages       | app/containers/Pages  | import { titleChange, descriptionChange, addGroup } from "@pages/Conditions/reducers/conditionActions"; |
| UI components    | @components  | app/components        | import FileUpload from "@components/FileUpload/FileUpload";                                             |
| Redux            | @redux       | app/redux             | import \* as notification from "@redux/constants/notifConstants";                                       |
| Global styles    | @styles      | app/styles/components | import css from "@styles/Form.scss";                                                                    |
| Genric constants | @api         | app/api               | import { encryptId } from "@api/constants" ;                                                            |
| Helper functions | @helpers     | app/helpers           | import { AuthUser , getToken } from '@helpers/userInfo' ;                                               |
| Utilities        | @utils       | app/utils             | import history from "@utils/history";                                                                   |
| Types            | @customTypes | app/types             | import { SelectOptions } from "@customTypes/data";                                                      |
| Hooks            | @hooks       | app/hooks             | import { useAppDispatch } from '@hooks/redux' ;                                                         |
| Images           | @images      | public/images         | import logo from "@images/logo.svg" ;                                                                   |
| Lotties          | @lotties     | public/lotties        | import question from "@lotties/racoon/question.json";                                                   |

# Template Architecture

---

This is template architecture in diagram visualization. Click diagram or full screen button ![full screen](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABXRSTlMA758vX1Pw3BoAAABJSURBVAjXY8AJQkODGBhUQ0MhbAUGBiYY24CBgRnGFmZgMISwgwwDGRhEhVVBbAVmEQYGRwMmBjIAQi/CTIRd6G5AuA3dzYQBAHj0EFdHkvV4AAAAAElFTkSuQmCC) to show in new tab with full screen

#### Components & Containers

This diagram bellow explain whole project structure.

![components](https://uploads-ssl.webflow.com/61655ed847fce20a68495af3/62b968b0d3bd766378567684_Untitled%20Diagram.drawio.png)

#### Routing

This diagram explain routing structure from api menu to page routing and every available layout(containers) to components.

![routing](<https://uploads-ssl.webflow.com/61655ed847fce20a68495af3/62b969f8b919e89346b56592_Untitled%20Diagram.drawio%20(1).png>)

#### Redux

Explain CRUD data structure from api gateway read by components then created and manipulated by reducers.

![redux](<https://uploads-ssl.webflow.com/61655ed847fce20a68495af3/62b96adccb92c48e53a34bca_Untitled%20Diagram.drawio%20(2).png>)

#### Design & Themes

The redux structure about manipulating state that related ui changes.

![design](<https://uploads-ssl.webflow.com/61655ed847fce20a68495af3/62b96b528031cc74e23ee232_Untitled%20Diagram.drawio%20(3).png>)

# Create New Page

- Go to `app/containers/`
- Create new folder ex: **MyPage**. _The name must in capitalize_
- Create new js file inside that folder **MyPage**, ex `SamplePage.js`. _The name must in capitalize_
- Inside the file create a simple page HTML ex:

  ```js
  // file: app/containers/MyPage/SamplePage.js

  import React from "react";
  import { Helmet } from "react-helmet";
  import { PapperBlock } from "@components";

  class SamplePage extends React.Component {
    render() {
      const title = "Sample title";
      const description = "samle description";
      return (
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
          </Helmet>
          <PapperBlock title="Blank Page" desc="Some text description">
            Content
          </PapperBlock>
        </div>
      );
    }
  }

  export default SamplePage;
  ```

- Import it asynchronously to the routing. Open file `app/containers/pageListAsync.js`

  ```js
  // app/containers/pageListAsync.js

  export const SamplePage = Loadable({
    loader: () => import("./MyPage/SamplePage"),
    loading: Loading,
  });
  ```

- Load it inside the template. In this example we'll use in dashboard template. Open file `app/containers/App/Application.js`

  ```js
  // file: app/containers/App/Application.js

  import { SamplePage } from "../pageListAsync";
  class Application extends React.Component {
    render() {
      const { changeMode } = this.props;
      return (
        <Dashboard history={this.props.history} changeMode={changeMode}>
          <Switch>
            <Route exact path="/app/sample-page" component={SamplePage} />
          </Switch>
        </Dashboard>
      );
    }
  }
  ```

- Then you can access it at [http://localhost:3000/app/sample-page](http://localhost:3000/app/sample-page)
- Also you can put the a usual link inside <a /> or material button. [See this documentation](http://localhost:3000/app/forms/buttons)

# External Reference

Here's some external reference of library that we used

- **Material UI** [https://material-ui.com/](https://material-ui.com/)
- **React Boilerplate** [https://www.reactboilerplate.com/](https://www.reactboilerplate.com/)
- **JSS (CSS in JS)** [https://cssinjs.org/](https://cssinjs.org/)
- **Immutable JS** [https://facebook.github.io/immutable-js/](https://facebook.github.io/immutable-js/)

Refer to package.json for further refferences.
