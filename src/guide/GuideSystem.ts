
//新手引导例子

// enum GuideStep {
//     welcome = 0 ,               //欢迎
//     build_receptionist = 1,     //建造接待台
// 	recruit_nurse = 2,          //招募护士
//     employ_nurse = 3,           //雇佣护士
//     build_diagnosing = 4,       //建造诊断室
//     recruit_doctor = 5,        //招募医生
//     employ_doctor = 6,          //雇佣医生
//     wear_equipment = 7,         //穿戴装备
//     equipment_introduce = 8,    //装备介绍
//     guide_end = 9,              //引导结束
// }

// interface IGuideDispose {
//     dispose():void;
// }
// interface IGuideList {
//     [key:number]:(next:Function)=>IGuideDispose;
// }

// class GuideManager {

//     constructor(){
//         //不可更改的ui
//         //MainMap的name及地图区域id：regionBuilding1、RegionMap类的name、BuildingBuildBox的name及建造按钮id:btnCreate
//         //CommonPanel的name及菜单按钮id:btnMenu、MenuView的name及招募按钮btnRecruit、
//     }
//     static Guide_Talk_End : string = 'Guide_Talk_End';                      //讲话引导结束
    
//     static Guide_Enter_Region_Map_1 : string = 'GUIDE_ENTER_BUILDING_1';    //进去地图区域1
//     static Guide_Open_Building_Box : string = 'Guide_Open_Building_Box';    //打开建造建筑 -- 接待台，一般诊断室
//     static Guide_Building_Success : string = 'Guide_Building_Success';      //建造建筑成功 -- 接待台，一般诊断室

//     static Guide_Open_Recruit_Box : string = 'Guide_Open_Recruit_Box';      //打开招募界面
//     static Guide_Select_Nurse_Tab : string = 'Guide_Select_Nurse_Tab';      //选中护士选项
//     static Guide_Recruit_Success : string = 'Guide_Recruit_Success';        //招募成功

//     static Guide_Open_Building_Menu : string = 'Guide_Open_Building_Menu';  //打开建筑菜单
//     static Guide_Open_Employ_Box : string = 'Guide_Open_Employ_Box';        //打开雇佣界面
//     static Guide_Employ_Success : string = 'Guide_Employ_Success';          //雇佣成功

//     static Guide_Open_Employee_View : string = 'Guide_Open_Employee_View';      //打开职员界面
//     static Guide_Open_Equipment_View : string = 'Guide_Open_Equipment_View';   //打开装备列表
//     static Guide_Open_AttrRp_View : string = 'Guide_Open_AttrRp_View';          //打开装备属性替换界面
//     static Guide_Close_Equip_Operate_View : string = 'Guide_Close_Equip_Operate_View';        //关闭装备属性替换界面
//     static Guide_Close_Employee_View : string = 'Guide_Close_Employee_View';    //关闭职员界面
//     static Guide_Equip_Success : string = 'Guide_Equip_Success';                //穿戴成功

//     static Guide_Open_Task_View : string = 'Guide_Open_Task_View';          //打开任务界面

//     static GuideList:IGuideList = {
//         [GuideStep.welcome] : GuideManager.welcom,
//         [GuideStep.build_receptionist] : GuideManager.buildReceptionist,
//         [GuideStep.recruit_nurse] : GuideManager.recruitNurse,
//         [GuideStep.employ_nurse] : GuideManager.employNurse,
//         [GuideStep.build_diagnosing] : GuideManager.buildDiagnosing,
//         [GuideStep.recruit_doctor] : GuideManager.recruitDoctor,
//         [GuideStep.employ_doctor] : GuideManager.employDoctor,
//         [GuideStep.wear_equipment] : GuideManager.wearEquipment,
//         [GuideStep.equipment_introduce] : GuideManager.equipmentIntroduce,
//         [GuideStep.guide_end] : GuideManager.guideEnd,
//     }
//     private static _isInit : boolean = false;
//     static init():void{
//         if(this._isInit) return;
//         this._isInit = true;
//         let arr = [];
//         let guideStep = RequestCacheData.getInstance().getCacheByKey('guideStep');
//         for(let key in GuideManager.GuideList) {
//             if(guideStep <= parseInt(key)){
//                 arr.push(GuideManager.GuideList[key]);
//             }
//         }
//         if(arr.length == 0){
//             return;
//         }
//         console.log('进入引导');
//         let lastGuideDispose : IGuideDispose = null;
//         function run():void{
//             if(lastGuideDispose){
//                 lastGuideDispose.dispose();
//                 lastGuideDispose = null;
//             }
//             if(arr.length > 0){
//                 let fun = arr.shift();
//                 lastGuideDispose = fun(run);
//             }else{
//                 let scene = UI.instance.getScene();
//                 if(scene && scene.name == 'MainScene'){
//                     (<MainScene>scene).updateScrollerEnabled();
//                 }
//                 GuideMask.dispose();
//             }
//         }
//         run();
//     }
//     //完成某步骤
//     static guideRequest(guideStep):Promise<any>{
//         return new Promise<any>((resolve,reject)=>{
//             console.log('完成引导步骤',guideStep);
//             GameHttp.request({'command':NetCode.FINISH_GUIDE_TASK,'guideStep':guideStep},(rpData)=>{
//                 resolve(rpData);
//             },()=>{
//                 reject();
//             });
//         });        
//     }
//     //新手引导消息监听
//     static notification(name):Promise<any>{
//         return new Promise<any>((resolve,reject)=>{
//             ebe.addNotification(name,(...args)=>{
//                 ebe.removeNotificationByName(name);
//                 resolve(...args);
//             },this);
//         });
//     }
//     //新手引导倒计时
//     static timeout(time,...args):Promise<any>{
//         return new Promise<any>((resolve,reject)=>{
//             let timeid = egret.setTimeout(()=>{
//                 egret.clearTimeout(timeid);
//                 resolve(...args);
//             },this,time);
//         });
//     }
//     //欢迎
//     static welcom(next:Function):IGuideDispose{
//         console.log('引导：欢迎')
//         UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_1')}])
//         .then((comp)=>{
//             ebe.addNotification(GuideManager.Guide_Talk_End,()=>{
//                 GuideManager.guideRequest(1).then(()=>{
//                     UI.instance.remove(comp);
//                     next();
//                 });
//             },this);
//         });
//         return {
//             dispose():void{
//                 ebe.removeNotificationByName(GuideManager.Guide_Talk_End);
//             }
//         }
//     }

//     //建造接待台
//     static buildReceptionist(next:Function):IGuideDispose {
//         console.log('引导：建造接待台');
//         //引导讲话
//         UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_2')}])
//         .then((comp)=>{
//             GuideManager.notification(GuideManager.Guide_Talk_End)
//             .then(()=>{
//                 UI.instance.remove(comp);
//                 //指向接待台
//                 return GuideManager.pointBuilding(11001);
//             }).then(()=>{
//                 //打开接待台建造页面
//                 return GuideManager.notification(GuideManager.Guide_Open_Building_Box);
//             }).then((buildId)=>{
//                 return GuideManager.timeout(200,buildId);
//             }).then((buildId)=>{
//                 //指向建造界面的建造按钮
//                 let comp = <BuildingBuildBox>UI.instance.getBox('BuildingBuildBox');
//                 GuideMask.show(comp['btnCreate']);
//                 return GuideManager.notification(GuideManager.Guide_Building_Success);
//             }).then((buildId)=>{
//                 if(buildId == 11001){
//                     GuideManager.guideRequest(2).then(()=>{
//                         GuideMask.hide();
//                         next();
//                     });
//                 }
//             });
//         });
//         return {
//             dispose():void{
//                 ebe.removeNotificationByName(GuideManager.Guide_Talk_End);
//                 ebe.removeNotificationByName(GuideManager.Guide_Enter_Region_Map_1);
//                 ebe.removeNotificationByName(GuideManager.Guide_Open_Building_Box);
//                 ebe.removeNotificationByName(GuideManager.Guide_Building_Success);
//             }
//         }
//     }
    
//     //招募护士
//     static recruitNurse(next:Function):IGuideDispose{
//         console.log('引导：招募护士');
//         UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_3')}])
//         .then((comp)=>{
//             GuideManager.notification(GuideManager.Guide_Talk_End)
//             .then(()=>{
//                 UI.instance.remove(comp);
//                 //指向招募按钮
//                 let commonP = UI.instance.getCommonBox('CommonPanel');
//                 GuideMask.show(commonP['btnRecruit'],2);
//                 return GuideManager.notification(GuideManager.Guide_Open_Recruit_Box);
//             }).then(()=>{
//                 return GuideManager.timeout(200);
//             }).then(()=>{
//                 //指向护士选项按钮
//                 let recruitComp = <RecruitMain>UI.instance.getBox('RecruitMain');
//                 GuideMask.show(recruitComp.getTabBarButton(1));
//                 return GuideManager.notification(GuideManager.Guide_Select_Nurse_Tab);
//             }).then(()=>{
//                 GuideMask.hide();
//                 //选择护士前的引导讲话
//                 UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_4')}])
//                 .then((comp)=>{
//                     GuideManager.notification(GuideManager.Guide_Talk_End)
//                     .then(()=>{
//                         UI.instance.remove(comp);
//                         //指向第一个护士的招募按钮
//                         let recruitComp = <RecruitMain>UI.instance.getBox('RecruitMain');
//                         GuideMask.show(recruitComp.getListFirstItemButton());
//                         return GuideManager.notification(GuideManager.Guide_Recruit_Success);
//                     }).then(()=>{
//                         GuideManager.guideRequest(3).then(()=>{
//                             let recruitComp = <RecruitMain>UI.instance.getBox('RecruitMain');
//                             if(recruitComp){
//                                 UI.instance.remove(recruitComp);
//                             }
//                             GuideMask.hide();
//                             next();
//                         });
//                     });
//                 });
//             });
//         });
//         return {
//             dispose():void{
//                 GuideManager.removeNotification(GuideManager.Guide_Select_Nurse_Tab,GuideManager.Guide_Talk_End,GuideManager.Guide_Open_Recruit_Box,GuideManager.Guide_Recruit_Success);
//             }
//         }
//     }

//     //雇佣护士
//     static employNurse(next:Function):IGuideDispose{
//         console.log('引导：雇佣护士');
//         UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_5')}])
//         .then((comp)=>{
//             GuideManager.notification(GuideManager.Guide_Talk_End)
//             .then(()=>{
//                 UI.instance.remove(comp);
//                 //指向接待台
//                 return GuideManager.pointBuilding(11001);
//             }).then(()=>{
//                 return GuideManager.notification(GuideManager.Guide_Open_Building_Menu);
//             }).then(()=>{
//                 return GuideManager.timeout(200);
//             }).then(()=>{
//                 let regionMap = <RegionMap>GuideManager.getMainMapParent().getChildByName('RegionMap');
//                 let funcPanel = regionMap.getBuildingFuncPanel();
//                 GuideMask.show(funcPanel.btnEmployee,2);
//                 return GuideManager.notification(GuideManager.Guide_Open_Employ_Box);
//             }).then(()=>{
//                 return GuideManager.timeout(200);
//             }).then(()=>{
//                 let employBox = <BuildingEmployeeBox>UI.instance.getBox('BuildingEmployeeBox');
//                 GuideMask.show(employBox.btnEmployee);
//                 return GuideManager.notification(GuideManager.Guide_Employ_Success);
//             }).then((ecomp)=>{
//                 GuideManager.guideRequest(4).then(()=>{
//                     UI.instance.remove(ecomp);
//                     GuideMask.hide();
//                     next();
//                 });
//             });
//         });
//         return {
//             dispose():void{
//                 GuideManager.removeNotification(GuideManager.Guide_Talk_End,GuideManager.Guide_Open_Building_Menu,GuideManager.Guide_Open_Employ_Box,GuideManager.Guide_Employ_Success);
//             }
//         }
//     }
//     //建造诊断室
//     static buildDiagnosing(next:Function):IGuideDispose{
//         console.log('引导：建造诊断室');
//         UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_6')}])
//         .then((comp)=>{
//             GuideManager.notification(GuideManager.Guide_Talk_End)
//             .then(()=>{
//                 UI.instance.remove(comp);
//                 //指向接待台
//                 return GuideManager.pointBuilding(11002);
//             }).then(()=>{
//                 return GuideManager.notification(GuideManager.Guide_Open_Building_Box);
//             }).then((buildId)=>{
//                 return GuideManager.timeout(200,buildId);
//             }).then((buildId)=>{
//                 console.log(buildId);
//                 let comp = <BuildingBuildBox>UI.instance.getBox('BuildingBuildBox');
//                 GuideMask.show(comp['btnCreate']);
//                 return GuideManager.notification(GuideManager.Guide_Building_Success);
//             }).then((buildId)=>{
//                 if(buildId == 11002){
//                     GuideManager.guideRequest(5).then(()=>{
//                         GuideMask.hide();
//                         next();
//                     });
//                 }
//             });
//         });
//         return {
//             dispose():void{
//                 GuideManager.removeNotification(GuideManager.Guide_Talk_End,GuideManager.Guide_Open_Building_Box,GuideManager.Guide_Building_Success);
//             }
//         }
//     }
//     //招募医生
//     static recruitDoctor(next:Function):IGuideDispose{
//         console.log('引导：招募医生');
//         UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_7')}])
//         .then((comp)=>{
//             GuideManager.notification(GuideManager.Guide_Talk_End)
//             .then(()=>{
//                 UI.instance.remove(comp);
//                 //指向招募按钮
//                 let commonP = UI.instance.getCommonBox('CommonPanel');
//                 GuideMask.show(commonP['btnRecruit'],2);
//                 return GuideManager.notification(GuideManager.Guide_Open_Recruit_Box);
//             }).then(()=>{
//                 return GuideManager.timeout(200);
//             }).then(()=>{
//                 //指向第一个医生的招募按钮
//                 let recruitComp = <RecruitMain>UI.instance.getBox('RecruitMain');
//                 GuideMask.show(recruitComp.getListFirstItemButton());
//                 return GuideManager.notification(GuideManager.Guide_Recruit_Success);
//             }).then(()=>{
//                 GuideManager.guideRequest(6).then(()=>{
//                     let recruitComp = <RecruitMain>UI.instance.getBox('RecruitMain');
//                     if(recruitComp){
//                         UI.instance.remove(recruitComp);
//                     }
//                     GuideMask.hide();
//                     next();
//                 });
//             });
//         });
//         return {
//             dispose():void{
//                 GuideManager.removeNotification(GuideManager.Guide_Talk_End,GuideManager.Guide_Open_Recruit_Box,GuideManager.Guide_Recruit_Success);
//             }
//         }
//     }
//     //雇佣医生
//     static employDoctor(next:Function):IGuideDispose{
//         console.log('引导：雇佣医生');
//         UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_8')}])
//         .then((comp)=>{
//             GuideManager.notification(GuideManager.Guide_Talk_End)
//             .then(()=>{
//                 UI.instance.remove(comp);
//                 //指向一般诊断室
//                 return GuideManager.pointBuilding(11002);
//             }).then(()=>{
//                 return GuideManager.notification(GuideManager.Guide_Open_Building_Menu);
//             }).then(()=>{
//                 return GuideManager.timeout(200);
//             }).then(()=>{
//                 let regionMap = <RegionMap>GuideManager.getMainMapParent().getChildByName('RegionMap');
//                 let funcPanel = regionMap.getBuildingFuncPanel();
//                 GuideMask.show(funcPanel.btnEmployee);
//                 return GuideManager.notification(GuideManager.Guide_Open_Employ_Box);
//             }).then(()=>{
//                 return GuideManager.timeout(200);
//             }).then(()=>{
//                 let employBox = <BuildingEmployeeBox>UI.instance.getBox('BuildingEmployeeBox');
//                 GuideMask.show(employBox.btnEmployee);
//                 return GuideManager.notification(GuideManager.Guide_Employ_Success);
//             }).then((ecomp)=>{
//                 GuideManager.guideRequest(7).then(()=>{
//                     UI.instance.remove(ecomp);
//                     GuideMask.hide();
//                     next();
//                 });
//             });
//         });
//         return {
//             dispose():void{
//                 GuideManager.removeNotification(GuideManager.Guide_Talk_End,GuideManager.Guide_Open_Building_Menu,GuideManager.Guide_Open_Employ_Box,GuideManager.Guide_Employ_Success);
//             }
//         }
//     }
    
//     //穿戴装备
//     static wearEquipment(next:Function):IGuideDispose{
//         console.log('引导：穿戴装备');
//         UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_9')}])
//         .then((comp)=>{
//             GuideManager.notification(GuideManager.Guide_Talk_End)
//             .then(()=>{
//                 UI.instance.remove(comp);
//                 //指向职员
//                 let commonP = UI.instance.getCommonBox('CommonPanel');
//                 GuideMask.show(commonP['btnEmploye'],2);
//                 return GuideManager.notification(GuideManager.Guide_Open_Employee_View);
//             }).then(()=>{
//                 return GuideManager.timeout(200);
//             }).then(()=>{
//                 let empComp = <EmployeMain>UI.instance.getBox('EmployeMain');
//                 GuideMask.show(empComp['bg_have_0']);
//                 return GuideManager.notification(GuideManager.Guide_Open_Equipment_View);
//             }).then(()=>{
//                 return GuideManager.timeout(200);
//             }).then(()=>{
//                 let equipList = <EquipList>UI.instance.getBox('EquipList');
//                 GuideMask.show(equipList.getListFirstItem()); 
//                 return GuideManager.notification(GuideManager.Guide_Equip_Success);
//             }).then(()=>{
//                 GuideManager.guideRequest(8).then(()=>{
//                     GuideMask.hide();
//                     next();
//                 });
//             });
//         });
//         return {
//             dispose():void{
//                 GuideManager.removeNotification(GuideManager.Guide_Talk_End,GuideManager.Guide_Open_Employee_View,GuideManager.Guide_Open_Equipment_View,GuideManager.Guide_Equip_Success);
//             }
//         }
//     }
//     //装备介绍
//     static equipmentIntroduce(next:Function):IGuideDispose{
//         console.log('引导：装备介绍');
//         GuideManager.openEmployeeView().then(()=>{
//             return GuideManager.notification(GuideManager.Guide_Open_AttrRp_View);
//         }).then(()=>{
//             GuideMask.hide();
//             return GuideManager.timeout(200);
//         }).then(()=>{
//             UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_11')}])
//             .then((comp)=>{
//                 GuideManager.notification(GuideManager.Guide_Talk_End)
//                 .then(()=>{
//                     UI.instance.remove(comp);
//                     return GuideManager.guideRequest(9);
//                 }).then(()=>{
//                     let operate = <EquipOperate>UI.instance.getBox('EquipOperate');
//                     GuideMask.show(operate['close'],2);
//                     return GuideManager.notification(GuideManager.Guide_Close_Equip_Operate_View);
//                 }).then(()=>{
//                     let empComp = <EmployeMain>UI.instance.getBox('EmployeMain');
//                     GuideMask.show(empComp['close']);
//                     return GuideManager.notification(GuideManager.Guide_Close_Employee_View);
//                 }).then(()=>{
//                     GuideMask.hide();
//                     next();
//                 });
//             });
//         });
//         return {
//             dispose():void{
//                 GuideManager.removeNotification(GuideManager.Guide_Talk_End,GuideManager.Guide_Open_AttrRp_View,GuideManager.Guide_Close_Equip_Operate_View,GuideManager.Guide_Close_Employee_View);
//             }
//         }
//     }

//     //引导结束
//     static guideEnd(next:Function):IGuideDispose{
//         console.log('引导：引导结束');
//         UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_12')}])
//         .then((comp)=>{
//             GuideManager.notification(GuideManager.Guide_Talk_End)
//             .then(()=>{
//                 UI.instance.remove(comp);

//                 //指向菜单按钮
//                 let commonP = UI.instance.getCommonBox('CommonPanel');
//                 GuideMask.show(commonP['btnTask'],2);
//                 return GuideManager.notification(GuideManager.Guide_Open_Task_View);
//             }).then(()=>{
//                 return GuideManager.timeout(200);
//             }).then(()=>{
//                 GuideMask.hide();
//                 UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_13')}])
//                 .then((comp)=>{
//                     GuideManager.notification(GuideManager.Guide_Talk_End)
//                     .then(()=>{
//                         UI.instance.remove(comp);
//                         GuideManager.guideRequest(10).then(()=>{
//                             next();
//                         });
//                     })
//                 })
//             });
//         });
//         return {
//             dispose():void{
//                 GuideManager.removeNotification(GuideManager.Guide_Talk_End,GuideManager.Guide_Open_Task_View);
//             }
//         }
//     }

//     //指向地图区域中的建筑
//     static pointBuilding(buildId):Promise<any>{
//         return new Promise<any>((resolve,reject)=>{
//             //是否在建筑区域中，重登时，需要重新进入区域
//             let regionMap = <RegionMap>GuideManager.getMainMapParent().getChildByName('RegionMap');
//             if(!regionMap){
//                 //指向区域一
//                 let mainMap = <egret.DisplayObjectContainer>GuideManager.getMainMapParent().getChildByName('MainMap');
//                 let region = mainMap['regionBuilding1'];
//                 GuideMask.show(region);
//                 GuideManager.notification(GuideManager.Guide_Enter_Region_Map_1).then(()=>{
//                     GuideMask.hide();
//                     let timeid = egret.setTimeout(()=>{
//                         egret.clearTimeout(timeid);
//                         point();
//                     },this,500);
//                 });
//             }else{
//                 point();
//             }
//             function point():void{
//                 let regionMap = <RegionMap>GuideManager.getMainMapParent().getChildByName('RegionMap');
//                 let building = regionMap.getBuildingById(buildId);
//                 GuideMask.show(building);
//                 resolve();
//             }
//         });
//     }
//     //打开职员界面
//     static openEmployeeView():Promise<any>{
//         return new Promise<any>((resolve,reject)=>{
//             UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_10')}])
//             .then((comp)=>{
//                 GuideManager.notification(GuideManager.Guide_Talk_End)
//                 .then(()=>{
//                     UI.instance.remove(comp);

//                     let empComp = <EmployeMain>UI.instance.getBox('EmployeMain');
//                     if(!empComp){
//                         //指向职员
//                         let commonP = UI.instance.getCommonBox('CommonPanel');
//                         GuideMask.show(commonP['btnEmploye'],2);
//                         GuideManager.notification(GuideManager.Guide_Open_Employee_View)
//                         .then(()=>{
//                             return GuideManager.timeout(200);
//                         }).then(()=>{
//                             point();
//                         });
//                     }else{
//                         point();
//                     }
//                 });
//             });
//             function point():void{
//                 //指向装备
//                 let empComp = <EmployeMain>UI.instance.getBox('EmployeMain');
//                 GuideMask.show(empComp['bg_have_0']);
//                 resolve();
//             }
//         });
//     }

//     //移除监听
//     static removeNotification(...notices):void{
//         for(let name of notices){
//             ebe.removeNotificationByName(name);
//         }
//     }

//     //获取区域地图父容器
//     static getMainMapParent():egret.DisplayObjectContainer{
//         let mainMap = <egret.DisplayObjectContainer>UI.instance.getScene()['mapGroup'];
//         return mainMap;
//     }
//     //获取当前引导步骤
//     static getGuideStep():number {
//         return parseInt(RequestCacheData.getInstance().getCacheByKey('guideStep'));
//     }
//     //是否在引导中
//     static isInGuide():boolean {
//         let guideStep = GuideManager.getGuideStep();
//         return guideStep < 10;
//     }
// }