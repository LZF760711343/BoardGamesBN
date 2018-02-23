var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var niuniu;
(function (niuniu) {
    var brnn;
    (function (brnn) {
        var GameListLayer = (function (_super) {
            __extends(GameListLayer, _super);
            function GameListLayer() {
                var _this = _super.call(this) || this;
                /** 当前页数 */
                _this.currPage = 0;
                /** 总页数 */
                _this.countPage = 0;
                _this.skinName = GameListSkin;
                return _this;
            }
            GameListLayer.prototype.childrenCreated = function () {
                _super.prototype.childrenCreated.call(this);
                this._gamelist.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.openUserInfoLayer, this);
                this._next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextFun, this);
                this._previous.addEventListener(egret.TouchEvent.TOUCH_TAP, this.previousFun, this);
            };
            GameListLayer.prototype.nextFun = function () {
                this.showPlayersByPage(this.currPage + 1);
                // this._gamelist.numChildren
                // // if (this._scroller.viewport.height > 300) {
                //     egret.log("this._gamelist.height",this._gamelist.height);
                //     egret.log("this._scroller.viewport.scrollV",this._scroller.viewport.scrollV);
                // if (this._scroller.viewport.scrollV == 0) {
                //     this._scroller.viewport.scrollV += 300;
                // }
                // // }
            };
            GameListLayer.prototype.previousFun = function () {
                // if (this._scroller.viewport.scrollV < 300) {
                //     this._scroller.viewport.scrollV == 0;
                // } else {
                //     this._scroller.viewport.scrollV -= 300;
                // }
                this.showPlayersByPage(this.currPage - 1);
            };
            GameListLayer.prototype.updata = function (data, gameDatas) {
                this.gameDatas = gameDatas;
                // egret.log("data.players:",data.players);
                // let players;
                //若玩家列表数小于8
                if (data.players.length < 8) {
                    // players = this.getWinerList(data.players);
                    // egret.log(players,"结果是什么");
                    this.players = [];
                }
                else {
                    //对场外玩家排序，并且
                    this.players = this.getWinerList(data.players);
                    // egret.log("this.players:",this.players);
                    this.players = this.players.slice(8, this.players.length);
                }
                // var myCollection: eui.ArrayCollection = new eui.ArrayCollection(this.players);
                // var dataGroup: eui.DataGroup = this._gamelist;
                // dataGroup.dataProvider = myCollection;
                // dataGroup.itemRenderer = BRNNRoomPlayers; 
                //模拟数据列表：
                // let players:{
                //     playerId: number;
                //     nickName: string;
                //     chips: number;
                //     headImages: string;
                // }[] = [];
                // for(let i = 0;i<16;i++){
                //     players.push({playerId:i,nickName:"玩家"+i,chips:10000000,headImages:"defaultHead_png"});
                // }
                // this.players = players;
                //计算场外玩家人数
                this._changWaiCount.text = this.players.length.toString();
                //初始化页面/更新页面数据
                var pages = this.players.length / 16; //目前指定一页有16个对象
                this.countPage = pages > 0 ? Math.ceil(pages) : Math.floor(pages);
                this.currPage = 1; //重置当前第一页
                //显示第一页的内容
                this.showPlayersByPage(this.currPage);
            };
            /** 排序呢场外玩家 */
            GameListLayer.prototype.getWinerList = function (players) {
                var windatas = players;
                var list = [];
                windatas.forEach(function (el, i) {
                    //过滤掉王
                    if (el["isWang"] == false) {
                        list.push(el);
                    }
                });
                list.sort(function (a, b) {
                    return b.chips - a.chips; //按金币从大到小排序
                });
                return list;
            };
            GameListLayer.prototype.showPlayersByPage = function (page) {
                //获得该页显示的玩家列表
                if (page > this.countPage) {
                    page = this.countPage;
                }
                if (page <= 0 && this.countPage > 0) {
                    page = 1;
                }
                if (this.countPage == 0)
                    page = 0;
                this.currPage = page;
                var startIndex = (page - 1) * 16;
                var endIndex = page * 16;
                if (endIndex > this.players.length) {
                    endIndex = this.players.length;
                }
                var players = this.players.slice(startIndex, endIndex);
                var myCollection = new eui.ArrayCollection(players);
                var dataGroup = this._gamelist;
                dataGroup.dataProvider = myCollection;
                dataGroup.itemRenderer = BRNNRoomPlayers;
            };
            GameListLayer.prototype.openUserInfoLayer = function (e) {
                if (this.gameDatas && this.gameDatas.playerDatas) {
                    var id = this._gamelist.selectedItem.playerId;
                    var data = this.gameDatas.playerDatas[id];
                    // egret.log(data, "data是什么！");
                    if (data && data.UserInfo) {
                        //金币等更新时，可以及时显示改变
                        if (data.UserInfo.id == Global.playerDto.id)
                            new Layers.UserInfoLayer(Global.playerDto).open();
                        else
                            new Layers.UserInfoLayer(data.UserInfo).open();
                    }
                }
            };
            return GameListLayer;
        }(Layers.BaseLayer));
        brnn.GameListLayer = GameListLayer;
        __reflect(GameListLayer.prototype, "niuniu.brnn.GameListLayer");
        var BRNNRoomPlayers = (function (_super) {
            __extends(BRNNRoomPlayers, _super);
            function BRNNRoomPlayers() {
                var _this = _super.call(this) || this;
                _this.skinName = GameListItemSkin;
                return _this;
            }
            BRNNRoomPlayers.prototype.childrenCreated = function () {
                _super.prototype.childrenCreated.call(this);
            };
            BRNNRoomPlayers.prototype.dataChanged = function () {
                this._nameLabel.text = this.data.nickName;
                this._goldlabel.text = this.data.chips + "金币";
                this._headImg.source = this.data.headImages;
                this._gourp.name = this.data.playerId;
            };
            return BRNNRoomPlayers;
        }(eui.ItemRenderer));
        __reflect(BRNNRoomPlayers.prototype, "BRNNRoomPlayers");
    })(brnn = niuniu.brnn || (niuniu.brnn = {}));
})(niuniu || (niuniu = {}));
//# sourceMappingURL=GameListLayer.js.map