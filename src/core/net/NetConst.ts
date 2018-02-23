// TypeScript file
/**
 * 存放net里面的一些常量
 */
namespace net {
    /**
     * 消息的等级
     */
    export const enum MSG_LEVEL {
		/**
		 * 心跳包以及登陆相关协议都在这一层处理
		 */
        BASE,
		/**
		 * 全局消息都在这里处理
		 */
        GLOBAL,
		/**
		 * 场景消息都在这里处理
		 */
        SCENE
    }
    export const enum DIS_RESULT {
		/**
		 * 对这条消息不做任何处理
		 */
        NONE,
		/**
		 * 将消息从当前级别移除,然后将这条消息加入到下一级别的消息队列里面
		 */
        NEXT,
		/**
		 * 将这条消息从消息队列里面移除
		 */
        REMOVE,
        STOP
    }
    export const enum SERVER_TYPE {
        /**
         * 当前没有登陆服务器
         */
        NONE,
        /**
         * 登陆服务器中
         */
        CONNETING,
        /**
         * 当前连接的是登陆服务器
         */
        LOGIN,
        /**
         * 当前连接的是游戏服务器
         */
        GAME
    }
}