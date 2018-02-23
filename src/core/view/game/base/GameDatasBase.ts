class GameDatasBase {
	/**
	 * 房间信息
	 */
	public roomInfo: model.EnterScoreRoomInfo<any>;
	/**
	 * 用于判断客户端是否已经做过操作了
	 * 主要是用来服务器超时时,用来判断时候需要更新一些UI
	 */
	public isDoAction = false;
	/**
	 * 游戏模式:金币场还是房卡模式
	 */
	public gameType: GAME_TYPE;
	/**
	 * 自己的座位id
	 */
	public myPos: number;

	/**
	 * 自己的玩家id
	 */
	public myPlyerId: number;
	/**
	 * 游戏当前的阶段
	 */
	public gameStatus: GAME_STAGE;
	/**
	 * 是否重连的
	 */
	public isReconnect: boolean;

	/**
	 * 玩家信息列表
	 */
	public playerDatas: model.Map<model.PLAYER_INFO> = {};
	/**
	 * 用来记录玩家是否在游戏中
	 */
	public playingList: boolean[] = [];
	public constructor() {
	}
	/**
	 * 游戏结束后,重置playerDatas里面的一些数据
	 */
	public resetPlayerDatas() {
		for (let key in this.playerDatas) {
			this.playerDatas[key].touZhu = 0;
			this.playerDatas[key].qiangZhuang = -1;
			this.playerDatas[key].showed = 0;
			// this.playerDatas[key].ready = 0;
		}
	}
	/**
	 * 判断玩家是否在游戏中
	 */
	public isPlayngGame(id: number) {
		return this.playingList[id];
	}
	/**
	 * 获取当前游戏的人数
	 */
	public getPlayIngGameCnt() {
		let cnt = 0;
		for (let key in this.playingList) {
			if (this.playingList[key]) {
				cnt++;
			}
		}
		return cnt;
	}
	/**
	 * 获取游戏前房间人数
	 */
	public getNOPlayIngGameCnt(): number {
		let cnt = 0;
		for (let key in this.playerDatas) {
			if (this.playerDatas[key]) {
				cnt++;
			}
		}
		return cnt;
	}



	/**
	 * 获取自己的玩家数据
	 */
	public getSelfPlayerDatas() {
		return this.playerDatas[this.myPlyerId];
	}
	/**
	 * 自己是否已经开始游戏了
	 */
	public isSelfPlayingGame() {
		return this.playingList[this.myPlyerId];
	}
	/**
	 * 游戏是否已经正式开始了
	 */
	public isGameStart() {
		return this.roomInfo.done_game_cnt > 0;
	}
	/**
	 * 
	 */
	public isSelfId(id: number) {
		return this.myPlyerId === id;
	}


	/**
	 * 获取所有游戏中的人的玩家信息列表
	 */
	public getPlayingList() {
		let list: model.PLAYER_INFO[] = [];
		for (let key in this.playerDatas) {
			if (this.playingList[this.playerDatas[key].playerId]) {
				list.push(this.playerDatas[key]);
			}
		}
		return list;
	}
}