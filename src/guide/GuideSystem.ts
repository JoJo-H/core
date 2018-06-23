
// enum GuideStep {
//     welcome = 0 ,               //欢迎
//     build_receptionist = 1,     //建造接待台
// 	recruit_nurse = 2,          //招募护士
//     employ_nurse = 3,           //雇佣护士
//     build_diagnosing = 4,       //建造诊断室
//     recruit_doctor = 5,         //招募医生
//     employ_doctor = 6,          //雇佣医生
//     open_task_view = 7,         //引导打开主线任务

//     wear_equipment = 8,         //穿戴装备
//     //equipment_introduce = 9,  //装备介绍
//     unlock_first_region = 9     //引导解锁第一区域
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
    
//     static Guide_Enter_Region_Map : string = 'Guide_Enter_Region_Map';    //进去地图区域1
//     static Guide_Open_Building_Box : string = 'Guide_Open_Building_Box';    //打开建造建筑 -- 接待台，一般诊断室
//     static Guide_Building_Success : string = 'Guide_Building_Success';      //建造建筑成功 -- 接待台，一般诊断室

//     static Guide_Open_Recruit_Box : string = 'Guide_Open_Recruit_Box';      //打开招募界面
//     static Guide_Select_Doctor_Tab : string = 'Guide_Select_Doctor_Tab';      //选中护士选项
//     static Guide_Recruit_Success : string = 'Guide_Recruit_Success';        //招募成功

//     static Guide_Open_Building_Menu : string = 'Guide_Open_Building_Menu';  //打开建筑菜单
//     static Guide_Open_Employ_Box : string = 'Guide_Open_Employ_Box';        //打开雇佣界面
//     static Guide_Employ_Success : string = 'Guide_Employ_Success';          //雇佣成功

//     static Guide_Open_Employee_View : string = 'Guide_Open_Employee_View';                  //打开职员界面
//     static Guide_Open_Equipment_View : string = 'Guide_Open_Equipment_View';                //打开装备列表
//     static Guide_Open_AttrRp_View : string = 'Guide_Open_AttrRp_View';                      //打开装备属性替换界面
//     static Guide_Close_Equip_Operate_View : string = 'Guide_Close_Equip_Operate_View';      //关闭装备属性替换界面
//     static Guide_Close_Employee_View : string = 'Guide_Close_Employee_View';    //关闭职员界面
//     static Guide_Equip_Success : string = 'Guide_Equip_Success';                //穿戴成功

//     static Guide_Open_Task_View : string = 'Guide_Open_Task_View';                      //打开任务界面
//     static Guide_Goto_Unlock_First_Region : string = 'Guide_GOTO_Unlock_First_Region';  //升到5级后引导解锁第一区域
//     static Guide_Open_Region_Unlock_Box : string = 'Guide_Open_Region_Unlock_Box';      //打开解锁区域界面
//     static Guide_Unlock_Region_Map : string = 'Guide_Unlock_Region_Map';                //解锁地图区域

//     static GuideList:IGuideList = {
//         [GuideStep.welcome] : GuideManager.welcom,
//         [GuideStep.build_receptionist] : GuideManager.buildReceptionist,
//         [GuideStep.recruit_nurse] : GuideManager.recruitNurse,
//         [GuideStep.employ_nurse] : GuideManager.employNurse,
//         [GuideStep.build_diagnosing] : GuideManager.buildDiagnosing,
//         [GuideStep.recruit_doctor] : GuideManager.recruitDoctor,
//         [GuideStep.employ_doctor] : GuideManager.employDoctor,
//         [GuideStep.open_task_view] : GuideManager.openTaskComp,

//         [GuideStep.wear_equipment] : GuideManager.wearEquipment,
//         // [GuideStep.equipment_introduce] : GuideManager.equipmentIntroduce,
//         [GuideStep.unlock_first_region] : GuideManager.unlockFirstRegion
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
//                 GuideManager.updateMainSceneScrollerEnabled();
//                 let fun = arr.shift();
//                 lastGuideDispose = fun(run);
//             }else{
//                 GuideMask.hide();
//                 GuideManager.mainSceneScrollerEnabled(true);
//                 GuideMask.dispose();
//                 GuideManager.removeGuideTalkComp();
//                 console.log('引导全部结束,dispose');
//             }
//         }
//         run();
//     }
//     //更新主场景的滚动条
//     static updateMainSceneScrollerEnabled():void{
//         let scene = UI.instance.getScene();
//         if(scene && scene.name == 'MainScene'){
//             (<MainScene>scene).scrollerEnabled(!GuideManager.isInLineGuide());
//         }
//     }
//     //主场景的滚动条是否可滚动
//     static mainSceneScrollerEnabled(flag:boolean):void{
//         let scene = UI.instance.getScene();
//         if(scene && scene.name == 'MainScene'){
//             (<MainScene>scene).scrollerEnabled(flag);
//         }
//     }
//     //主场景滚动到底部
//     static selectMainSceneBuilding(selectIndoex:number):void{
//         let scene = UI.instance.getScene();
//         if(scene && scene.name == 'MainScene'){
//             (<MainScene>scene).selectBuilding(selectIndoex);
//         }
//     }
//     /**
//      * 引导请求,完成某步骤
//      * @param guideStep 步骤
//      */
//     static guideRequest(guideStep:number):Promise<any>{
//         return new Promise<any>((resolve,reject)=>{
//             console.log('请求完成引导步骤',guideStep);
//             GuideMask.hideWithTransparent();
//             GameHttp.request({'command':NetCode.FINISH_GUIDE_TASK,'guideStep':guideStep},(rpData)=>{
//                 console.log('确定完成引导步骤：',guideStep);
//                 resolve(rpData);
//             },()=>{
//                 reject();
//             });
//         });        
//     }
//     /**
//      * 新手引导消息监听
//      * @param name 消息名称
//      * @param checkFun 是否移除消息的检测方法,返回boolean
//      */
//     static notification(name,checkFun:Function=null):Promise<any>{
//         return new Promise<any>((resolve,reject)=>{
//             ebe.addNotification(name,(...args)=>{
//                 if(checkFun){
//                     console.log('开始检测checkFun');
//                     if(checkFun()){
//                         console.log('执行resolve');
//                         ebe.removeNotificationByName(name);
//                         resolve(...args);
//                     }
//                 }else{
//                     // console.log('没有checkFun');
//                     ebe.removeNotificationByName(name);
//                     resolve(...args);
//                 }
//             },this);
//         });
//     }
//     /**
//      * 新手引导延迟
//      * @param time 延迟时间 毫秒
//      * @param args 参数
//      */
//     static timeout(time,...args):Promise<any>{
//         return new Promise<any>((resolve,reject)=>{
//             GuideMask.hideWithTransparent();
//             let timeid = egret.setTimeout(()=>{
//                 egret.clearTimeout(timeid);
//                 resolve(...args);
//             },this,time);
//         });
//     }
    
//     //欢迎
//     static welcom(next:Function):IGuideDispose{
//         console.log('引导1：欢迎')
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
//         console.log('引导2：建造接待台');
//         //接待台是否已建造，已建造跳过该引导步骤
//         let building = RequestCacheData.getInstance().buildingInfo.find((item)=>{
//             return item.buildId == 11001;
//         })
//         if(building) {
//             GuideManager.guideRequest(2).then(()=>{
//                 next();
//             });
//             return;
//         }
//         //引导讲话
//         GuideMask.hide();
//         UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_2')}])
//         .then((comp)=>{
//             GuideManager.notification(GuideManager.Guide_Talk_End,GuideManager.checkRegionBuilding1)
//             .then(()=>{
//                 UI.instance.remove(comp);
//                 //指向接待台
//                 return GuideManager.pointBuilding('regionBuilding1',1,11001);
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
//                         next();
//                     });
//                 }
//             });
//         });
//         return {
//             dispose():void{
//                 ebe.removeNotificationByName(GuideManager.Guide_Talk_End);
//                 ebe.removeNotificationByName(GuideManager.Guide_Enter_Region_Map);
//                 ebe.removeNotificationByName(GuideManager.Guide_Open_Building_Box);
//                 ebe.removeNotificationByName(GuideManager.Guide_Building_Success);
//             }
//         }
//     }
    
//     //招募护士
//     static recruitNurse(next:Function):IGuideDispose{
//         console.log('引导3：招募护士');
//         if(ebe.singleton(WorkerData).hasWorkerByType(WorkerType.Nurse)) {
//             GuideManager.guideRequest(3).then(()=>{
//                 next();
//             });
//             return;
//         }
//         GuideMask.hide();
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
//                 GuideMask.hide();
//                 //选择护士前的引导讲话
//                 UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_4')}])
//                 .then((comp)=>{
//                     GuideManager.notification(GuideManager.Guide_Talk_End)
//                     .then(()=>{
//                         UI.instance.remove(comp);
//                         //指向第一个护士的招募按钮
//                         let recruitComp = <RecruitMain>UI.instance.getBox('RecruitMain');
//                         GuideMask.show(recruitComp.getListItemButton(0));
//                         return GuideManager.notification(GuideManager.Guide_Recruit_Success);
//                     }).then(()=>{
//                         GuideManager.guideRequest(3).then(()=>{
//                             let recruitComp = <RecruitMain>UI.instance.getBox('RecruitMain');
//                             if(recruitComp){
//                                 UI.instance.remove(recruitComp);
//                             }
//                             next();
//                         });
//                     });
//                 });
//             });
//         });
//         return {
//             dispose():void{
//                 GuideManager.removeNotification(GuideManager.Guide_Select_Doctor_Tab,GuideManager.Guide_Talk_End,GuideManager.Guide_Open_Recruit_Box,GuideManager.Guide_Recruit_Success);
//             }
//         }
//     }

//     //雇佣护士
//     static employNurse(next:Function):IGuideDispose{
//         console.log('引导4：雇佣护士');
//         GuideMask.hide();
//         UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_5')}])
//         .then((comp)=>{
//             GuideManager.notification(GuideManager.Guide_Talk_End)
//             .then(()=>{
//                 UI.instance.remove(comp);
//                 //指向接待台
//                 return GuideManager.pointBuilding('regionBuilding1',1,11001);
//             }).then(()=>{
//                 return GuideManager.notification(GuideManager.Guide_Open_Building_Menu);
//             }).then(()=>{
//                 return GuideManager.timeout(200);
//             }).then(()=>{
//                 let funcPanel = <BuildingFuncPanel>UI.instance.getTip("BuildingFuncPanel");
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
//         console.log('引导5：建造诊断室');
//         //诊断室是否已建造，已建造跳过该引导步骤
//         let building = RequestCacheData.getInstance().buildingInfo.find((item)=>{
//             return item.buildId == 11002;
//         })
//         if(building) {
//             GuideManager.guideRequest(5).then(()=>{
//                 next();
//             });
//             return;
//         }
//         GuideMask.hide();
//         UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_6')}])
//         .then((comp)=>{
//             GuideManager.notification(GuideManager.Guide_Talk_End)
//             .then(()=>{
//                 UI.instance.remove(comp);
//                 //指向诊断室
//                 return GuideManager.pointBuilding('regionBuilding1',1,11002);
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
//         console.log('引导6：招募医生');
//         if(ebe.singleton(WorkerData).hasWorkerByType(WorkerType.Doctor)) {
//             GuideManager.guideRequest(6).then(()=>{
//                 next();
//             });
//             return;
//         }
//         GuideMask.hide();
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
//                 //指向医生选项按钮
//                 let recruitComp = <RecruitMain>UI.instance.getBox('RecruitMain');
//                 GuideMask.show(recruitComp.getTabBarButton(1));
//                 return GuideManager.notification(GuideManager.Guide_Select_Doctor_Tab);
//             }).then(()=>{
//                 //指向第一个医生的招募按钮
//                 let recruitComp = <RecruitMain>UI.instance.getBox('RecruitMain');
//                 GuideMask.show(recruitComp.getListItemButton(0));
//                 return GuideManager.notification(GuideManager.Guide_Recruit_Success);
//             }).then(()=>{
//                 GuideManager.guideRequest(6).then(()=>{
//                     let recruitComp = <RecruitMain>UI.instance.getBox('RecruitMain');
//                     if(recruitComp){
//                         UI.instance.remove(recruitComp);
//                     }
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
//         console.log('引导7：雇佣医生');
//         GuideMask.hide();
//         UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_8')}])
//         .then((comp)=>{
//             GuideManager.notification(GuideManager.Guide_Talk_End)
//             .then(()=>{
//                 UI.instance.remove(comp);
//                 //指向一般诊断室
//                 return GuideManager.pointBuilding('regionBuilding1',1,11002);
//             }).then(()=>{
//                 return GuideManager.notification(GuideManager.Guide_Open_Building_Menu);
//             }).then(()=>{
//                 return GuideManager.timeout(200);
//             }).then(()=>{
//                 let funcPanel = <BuildingFuncPanel>UI.instance.getTip("BuildingFuncPanel");
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

//     //引导主线任务面板打开
//     static openTaskComp(next:Function):IGuideDispose{
//         console.log('引导8：引导主线任务面板打开');
//         GuideMask.hide();
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
//                         GuideManager.guideRequest(8).then(()=>{
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

//     //穿戴装备
//     static wearEquipment(next:Function):IGuideDispose{
//         console.log('引导9：穿戴装备');
//         GuideMask.hide();
//         GuideManager.notification(GuideManager.Guide_Open_Employee_View)
//         .then(()=>{
//             return GuideManager.timeout(200);
//         }).then(()=>{
//             let have : boolean = false;
//             for(let info of RequestCacheData.getInstance().equipInfo){
//                 let config = ConfigCenter.getConfigItem('GameConfigEquip_json',info.configId,'id');
//                 if(config.wearPos == 1 && config.limitWorkerType == WorkerType.Doctor){
//                     have = true;
//                     break;
//                 }
//             }
//             if(have) {
//                 UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_9')}])
//                 .then((comp)=>{
//                     GuideManager.notification(GuideManager.Guide_Talk_End)
//                     .then(()=>{
//                         let empComp = <EmployeMain>UI.instance.getBox('EmployeMain');
//                         GuideMask.show(empComp['bg_have_0']);
//                         return GuideManager.notification(GuideManager.Guide_Open_Equipment_View);
//                     }).then(()=>{
//                         return GuideManager.timeout(200);
//                     }).then(()=>{
//                         let equipList = <EquipList>UI.instance.getBox('EquipList');
//                         GuideMask.show(equipList.getListFirstItem()); 
//                         return GuideManager.notification(GuideManager.Guide_Equip_Success);
//                     }).then(()=>{
//                         GuideManager.guideRequest(9).then(()=>{
//                             next();
//                         });
//                     });
//                 });
//             }else{
//                 GuideManager.guideRequest(9).then(()=>{
//                     next();
//                 });
//             }
//         });
//         return {
//             dispose():void{
//                 GuideManager.removeNotification(GuideManager.Guide_Talk_End,GuideManager.Guide_Open_Employee_View,GuideManager.Guide_Open_Equipment_View,GuideManager.Guide_Equip_Success);
//             }
//         }
//     }

//     /**
//      * 解锁第一区域，当玩家等级达到5级时解锁引导，如果资源不足，保留在资源购买界面即可
//      */
//     static unlockFirstRegion(next:Function):IGuideDispose{
//         //兼容，判断是否已解锁
//         GuideMask.hide();
//         if(RequestCacheData.getInstance().regionInfo.indexOf(2) > -1){
//             GuideManager.guideRequest(10).then(()=>{
//                 next();
//             });
//             return;
//         }
//         console.log('引导10：解锁第一区域');
//         if(GuideManager.checkUnlockFirstRegion()) {
//             startUnlock(next);
//         }else{
//             GuideManager.notification(GuideManager.Guide_Goto_Unlock_First_Region,GuideManager.checkUnlockFirstRegion).then(()=>{
//                 return GuideManager.timeout(500)
//             }).then(()=>{
//                 startUnlock(next);
//             });
//         }
//         function startUnlock(next:Function):void{
//             UI.instance.clearBox();
//             GuideManager.selectMainSceneBuilding(1);
//             GuideManager.mainSceneScrollerEnabled(false);

//             GuideMask.hide();
//             UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_14')}])
//             .then((comp)=>{
//                 GuideManager.notification(GuideManager.Guide_Talk_End)
//                 .then(()=>{
//                     UI.instance.remove(comp);

//                     //指向第一区域的解锁按钮
//                     let mainMap = <egret.DisplayObjectContainer>GuideManager.getMainMap();
//                     let region = mainMap['regionBuilding2'];
//                     GuideMask.show(region);
//                     //打开区域开启的界面后
//                     GuideManager.notification(GuideManager.Guide_Open_Region_Unlock_Box)
//                     .then(()=>{
//                         return GuideManager.timeout(200);
//                     }).then(()=>{
//                         GuideMask.hide();
//                         //引导对话
//                         UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_15')}])
//                         .then((comp)=>{
//                             GuideManager.notification(GuideManager.Guide_Talk_End)
//                             .then(()=>{
//                                 UI.instance.remove(comp);
                                
//                                 let box = UI.instance.getBox('RegionOpenBox');
//                                 GuideMask.show(box['btnOpen']);
//                                 return GuideManager.notification('RegionOpenBox_Open')
//                             }).then(()=>{
//                                 GuideManager.guideRequest(10).then(()=>{
//                                     next();
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         }
//         return {
//             dispose():void{
//                 GuideManager.mainSceneScrollerEnabled(true);
//                 ebe.removeNotificationByName(GuideManager.Guide_Talk_End);
//                 ebe.removeNotificationByName(GuideManager.Guide_Goto_Unlock_First_Region);
//                 ebe.removeNotificationByName(GuideManager.Guide_Open_Region_Unlock_Box);
//                 ebe.removeNotificationByName('RegionOpenBox_Open');
//             }
//         }
//     }

//     //装备介绍
//     // static equipmentIntroduce(next:Function):IGuideDispose{
//     //     console.log('引导9：装备介绍');
//     //     GuideMask.hide();
//     //     GuideManager.openEmployeeView().then(()=>{
//     //         return GuideManager.notification(GuideManager.Guide_Open_AttrRp_View);
//     //     }).then(()=>{
//     //         return GuideManager.timeout(200);
//     //     }).then(()=>{
//     //         GuideMask.hide();
//     //         UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_11')}])
//     //         .then((comp)=>{
//     //             GuideManager.notification(GuideManager.Guide_Talk_End)
//     //             .then(()=>{
//     //                 UI.instance.remove(comp);
//     //                 return GuideManager.guideRequest(9);
//     //             }).then(()=>{
//     //                 let operate = <EquipOperate>UI.instance.getBox('EquipOperate');
//     //                 GuideMask.show(operate['close'],2);
//     //                 return GuideManager.notification(GuideManager.Guide_Close_Equip_Operate_View);
//     //             }).then(()=>{
//     //                 let empComp = <EmployeMain>UI.instance.getBox('EmployeMain');
//     //                 GuideMask.show(empComp['close']);
//     //                 return GuideManager.notification(GuideManager.Guide_Close_Employee_View);
//     //             }).then(()=>{
//     //                 next();
//     //             });
//     //         });
//     //     });
//     //     return {
//     //         dispose():void{
//     //             GuideManager.removeNotification(GuideManager.Guide_Talk_End,GuideManager.Guide_Open_AttrRp_View,GuideManager.Guide_Close_Equip_Operate_View,GuideManager.Guide_Close_Employee_View);
//     //         }
//     //     }
//     // }

//     //检测是否可以开始引导解锁第一个区域，条件达到5级，并且在主场景
//     private static checkUnlockFirstRegion():boolean {
//         let mainMap = <egret.DisplayObjectContainer>GuideManager.getMainMap();
//         return mainMap && RequestCacheData.getInstance().userInfo.level >= 5;
//     }

//     private static checkRegionBuilding1():boolean {
//         let mapGroup = <egret.DisplayObjectContainer>UI.instance.getScene()['mapGroup'];
//         if(!mapGroup)return false;
//         let mainMap = <egret.DisplayObjectContainer>mapGroup.getChildByName('MainMap');
//         if(!mainMap) return false;
//         let region = mainMap['regionBuilding1'];
//         return GuideManager.checkExist(region,50,50);
//     }
//     /**
//      * 检测显示对象是否存在,是否渲染的宽高达到期望的宽高(可能渲染某一显示对象时,先渲染其子对象的宽高太小,导致显示的遮罩太小)
//      * @param target 目标显示对象
//      * @param w 至少需要的宽度
//      * @param h 至少需要的高度
//      */
//     static checkExist(target:egret.DisplayObject,w:number=0,h:number=0):boolean {
//         if(!target) return false;
//         let bounds = target.getTransformedBounds(UI.instance.stage);
//         return bounds.width > w && bounds.height > h;
//     }

//     /**
//      * 指向地图区域中的建筑 
//      * @param regionButtonId 主场景中的子对象,表示区域按钮的id名，用于搜索,如regionBuilding1
//      * @param buildId 
//      */
//     static pointBuilding(regionButtonId:string,regionId:number,buildId:number):Promise<any>{
//         return new Promise<any>((resolve,reject)=>{
//             //是否在建筑区域中，重登时，需要重新进入区域
//             let regionMap = <RegionMap>GuideManager.getRegionMap();
//             if(!regionMap){
//                 //指向区域一
//                 let mainMap = <egret.DisplayObjectContainer>GuideManager.getMainMap();
//                 let region = mainMap[regionButtonId];
//                 GuideMask.show(region);
//                 GuideManager.notification(GuideManager.Guide_Enter_Region_Map).then((id)=>{
//                     if(id !== void 0 && regionId == id) {
//                         GuideManager.timeout(500).then(()=>{
//                             point();
//                         });
//                     }
//                 });
//             }else{
//                 point();
//             }
//             function point():void{
//                 let regionMap = <RegionMap>GuideManager.getRegionMap();
//                 let building = regionMap.getBuildingById(buildId);
//                 GuideMask.show(building);
//                 resolve();
//             }
//         });
//     }
//     //打开职员界面
//     // static openEmployeeView():Promise<any>{
//     //     return new Promise<any>((resolve,reject)=>{
//     //         UI.instance.addBox(GuideTalkComponent,[{content:ConfigCenter.getLanguageName('task_main_10')}])
//     //         .then((comp)=>{
//     //             GuideManager.notification(GuideManager.Guide_Talk_End)
//     //             .then(()=>{
//     //                 UI.instance.remove(comp);

//     //                 let empComp = <EmployeMain>UI.instance.getBox('EmployeMain');
//     //                 if(!empComp){
//     //                     //指向职员
//     //                     let commonP = UI.instance.getCommonBox('CommonPanel');
//     //                     GuideMask.show(commonP['btnEmploye'],2);
//     //                     GuideManager.notification(GuideManager.Guide_Open_Employee_View)
//     //                     .then(()=>{
//     //                         return GuideManager.timeout(200);
//     //                     }).then(()=>{
//     //                         point();
//     //                     });
//     //                 }else{
//     //                     point();
//     //                 }
//     //             });
//     //         });
//     //         function point():void{
//     //             //指向装备
//     //             let empComp = <EmployeMain>UI.instance.getBox('EmployeMain');
//     //             GuideMask.show(empComp['bg_have_0']);
//     //             resolve();
//     //         }
//     //     });
//     // }

//     //移除对话框,有时会出现异常未移除
//     static removeGuideTalkComp():void{
//         let comp = UI.instance.getBox('GuideTalkComponent');
//         if(comp){
//             UI.instance.remove(comp);
//         }
//     }

//     //移除监听
//     static removeNotification(...notices):void{
//         for(let name of notices){
//             ebe.removeNotificationByName(name);
//         }
//     }
//     //获取我的主地图
//     static getMainMap():egret.DisplayObjectContainer {
//         let scene = UI.instance.getScene();
//         if(scene && scene.name == 'MainScene'){
//             let mainMapParent = <egret.DisplayObjectContainer>UI.instance.getScene()['mapGroup'];
//             let mainMap = <egret.DisplayObjectContainer>mainMapParent.getChildByName('MainMap');
//             return mainMap;
//         }
//         return null;
//     }
//     //获取我的区域地图
//     static getRegionMap():egret.DisplayObjectContainer {
//         let scene = UI.instance.getScene();
//         if(scene && scene.name == 'MainScene'){
//             let mapParent = <egret.DisplayObjectContainer>UI.instance.getScene()['mapGroup'];
//             let regionMap = <egret.DisplayObjectContainer>mapParent.getChildByName('RegionMap');
//             return regionMap;
//         }
//         return null;
//     }
//     //获取当前引导步骤
//     static getGuideStep():number {
//         return parseInt(RequestCacheData.getInstance().getCacheByKey('guideStep'));
//     }

//     //是否在直线引导中 -- 1~8属于直线引导
//     static isInLineGuide():boolean {
//         let guideStep = GuideManager.getGuideStep();
//         return guideStep < 8;
//     }
//     //是否在弱引导中
//     static isInWwakGuide():boolean {
//         let guideStep = GuideManager.getGuideStep();
//         return guideStep >= 8 && guideStep < 10;
//     }
//     //是否在引导第九步骤--穿戴装备
//     static isInWearStep():boolean {
//         let guideStep = GuideManager.getGuideStep();
//         return guideStep == 8;
//     }
//     //是否在引导中
//     isInGuide():boolean {
//         let guideStep = GuideManager.getGuideStep();
//         return guideStep < 10;
//     }
//     //是否引导遮罩中，比如对话框，及引导指向遮罩...
//     isShowMask():boolean {
//         let bool : boolean = UI.instance.getBox('GuideTalkComponent') ? true : false;
//         bool = bool || GuideMask.isShow();
//         return bool;
//     }
// }