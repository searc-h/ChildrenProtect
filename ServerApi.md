## web接口文档

- ### 通过用户名和密码登录----登录
    ```bash
        # POST请求    url:/api/admin/login

        # 请求参数:
        {
            username:string,
            password:string
        }

        # 返回数据:
        {
            code:number,
            message:string,
            data:{
                token:string,
                id:string
            }
        }
        
        # token携带方式
         authorization: Bearer token
    ```

- ### 通过手机号获取验证码----找回密码
    ```bash
        # POST请求    url:/api/admin/password/getCode

        # 请求参数:
        {
            phone:string
        }

        # 返回数据:
        {
            code:number,
            message:string,
        }
    ```


- ### 验证手机号与验证码是否匹配----找回密码
    ```bash
        # POST请求    url:/api/admin/password/sendCode

        # 请求参数:
        {
            phone:string,
            code:string | number
        }

        # 返回数据:
        {
            code:number,
            message:string,
        }
    ```

- ### 设置新密码----重置密码(这里第一次输入和第二次输入是否一致我们前端进行验证就行了★)
    ```bash
        # POST请求    url:/api/admin/password/setNewPassword

        # 请求参数:
        {
            phone:string,
            newPassword:string,
        }

        # 返回数据:
        {
            code:number,
            message:string,
        }
    ```

- ### 卡片数据展示----数据预览
    ```bash
        # POST请求    url:/api/admin/showDataCard

        # 请求参数:
        {
            //想不到吧，没有参数
        }

        # 返回数据:
        {
            code:number,
            message:string,
            data:{
                eventTotal:number,
                personTotal:number,
                childrenTotal:number
            }
        }
    ```

- ### 地图数据展示----数据预览
    ```bash
        # POST请求    url:/api/admin/showDataMap

        # 请求参数:
        {
            //无
        }

        # 返回数据:
        {
            code:number,
            message:string,
            data:{
                finishedEvents:[
                    {

                    },
                    {

                    },
                ],
                doingEvents:[
                    {

                    },
                    {

                    }
                ]
            }
        }
    ```




- ### 站长人员展示----站长管理
    ```bash
        # POST请求    url:/api/station/list

        # 请求参数:
        {
            current:1,  // 当前页码
        }

        # 返回数据:
        {
            code:number,
            message:string,
            data:{
                stationList:[
                    {
                        Key:1,   //这个是序号,指定表格中的顺序
                        id: 78641qweas,
                        phone:123231213,
                        name:"李家然",
                        organization:"重庆市渝北区宝圣湖街道",
                    },
                    {
                        Key:2,
                        id: 135asdq2da,
                        phone:12323321,
                        name:"李家星",
                        organization:"重庆市渝北区宝圣湖街道",
                    },
                    {
                        Key:3,
                        id: d123asd45,
                        phone:1433231213,
                        name:"李家成",
                        organization:"重庆市渝北区宝圣湖街道",
                    }
                    ...
                ]
            }
        }
    ```


- ### 站长人员检索----站长管理
    ```bash
        # POST请求    url:/api/station/search

        # 请求参数:
        {
            keyword:'李' //要么是电话号码，要么是姓名（模糊匹配+正则表达式）
        }

        # 返回数据:
        {
            code:number,
            message:string,
            data:{
                totalPage:1,   // 页码总数,基本上是1
                current:1,  // 当前页码,基本上是1
                size:10,    // 每页数据最大数量
                stationList:[]
            }
        }
    ```

- ### 站长人员添加----站长管理
    ```bash
        # POST请求    url:/api/station/add

        # 请求参数:
        {
            name:'李哥',
            phone: 831232131,
            province: "重庆市",
            city:"重庆市",
            district:"渝北区",
            street:"宝圣湖街道"
        }

        # 返回数据:
        {
            code:number,
            message:string
        }
    ```

- ### 站长人员删除----站长管理
    ```bash
        # POST请求    url:/api/station/remove

        # 请求参数:
        {
            id:5455121231
        }

        # 返回数据:
        {
            code:number,
            message:string
        }
    ```


- ### 站长人员信息修改----站长管理
    ```bash
        # POST请求    url:/api/station/modify

        # 请求参数:
        {
            id:5455121231,
            name:'李哥',
            phone: 831232131,
            province: "重庆市",
            city:"重庆市",
            district:"渝北区",
            street:"宝圣湖街道"
        }

        # 返回数据:
        {
            code:number,
            message:string
        }
    ```









- ### 主任人员展示----儿童主任管理
    ```bash
        # POST请求    url:/api/director/list

        # 请求参数:
        {
            current:1,  // 当前页码
        }

        # 返回数据:
        {
            code:number,
            message:string,
            data:{
                totalPage:10,   // 页码总数
                current:1,  // 当前页码
                size:10,    // 每页数据最大数量
                stationList:[
                    {
                        Key:1,   //这个是序号，指定表格中的顺序
                        id: 78641qweas,
                        phone:123231213,
                        name:"李家然",
                        organization:"重庆市渝北区宝圣湖街道",
                    },
                    {
                        Key:2，
                        id: 135asdq2da,
                        phone:12323321,
                        name:"李家星",
                        organization:"重庆市渝北区宝圣湖街道",
                    },
                    {
                        Key:3，
                        id: d123asd45,
                        phone:1433231213,
                        name:"李家成",
                        organization:"重庆市渝北区宝圣湖街道",
                    }
                    ...
                ]
            }
        }
    ```

- ### 主任人员检索----儿童主任管理
    ```bash
        # POST请求    url:/api/director/search

        # 请求参数:
        {
            keyword:'李' //要么是电话号码，要么是姓名（模糊匹配+正则表达式）
        }

        # 返回数据:
        {
            code:number,
            message:string,
            data:{
                totalPage:1,   // 页码总数,基本上是1
                current:1,   // 当前页码
                size:10,    // 每页数据最大数量
                directorList:[

                ]
            }
        }
    ```


- ### 主任人员添加----儿童主任管理
    ```bash
        # POST请求    url:/api/director/add

        # 请求参数:
        {
            name:'李哥',
            phone: 831232131,
            province: "重庆市",
            city:"重庆市",
            district:"渝北区",
            street:"宝圣湖街道"
        }

        # 返回数据:
        {
            code:number,
            message:string
        }
    ```


- ### 主任人员删除----儿童主任管理
    ```bash
        # POST请求    url:/api/director/remove

        # 请求参数:
        {
            id:5455121231
        }

        # 返回数据:
        {
            code:number,
            message:string
        }
    ```



- ### 主任人员信息修改----儿童主任管理
    ```bash
        # POST请求    url:/api/director/modify

        # 请求参数:
        {
            id:5455121231,
            name:'李哥',
            phone: 831232131,
            province: "重庆市",
            city:"重庆市",
            district:"渝北区",
            street:"宝圣湖街道"
        }

        # 返回数据:
        {
            code:number,
            message:string
        }
    ```


- ### 管理员通过手机号获取验证码----设置
    ```bash 
        # POST请求    url:/api/admin/getCode   //注意上面那个获取验证码是/api/admin/password/getCode，在未登录状态   ♀

        # 请求参数:
        {
            id:5455121231,  //不知道你用不用
            newPhone:'14888888',
        }

        # 返回数据:
        {
            code:number,
            message:string
        }
    ```


- ### 管理员修改用户名----设置(！！！他连用户名跟手机号的分不清吗，这里居然是修改手机号)
    ```bash
        # POST请求    url:/api/admin/modifyPhone

        # 请求参数:
        {
            id:5455121231,
            newPhone:"1354929443",
            code:7474
        }

        # 返回数据:
        {
            code:number,
            message:string
        }
    ```


- ### 管理员修改密码----设置（这里是在登录状态下的修改密码，与上面的修改密码不同哦☝）
    ```bash
        # POST请求    url:/api/admin/modifyPassword

        # 请求参数:
        {
            id:5455121231,
            newPassword:"312"
        }

        # 返回数据:
        {
            code:number,
            message:string
        }
    ```


- ### 获取全部事件----事件管理（不得不说，逼事真多）
    ```bash 
        # POST请求    url:/api/event/list

        # 请求参数:
        {
            current:1 //当前页码
        }

        # 返回数据:
        {
            code:number,
            message:string,
            data:{
                eventList:[
                    {
                        id:'wae21323da',
                        number:1,
                        type:"非强制类型", //其实这里都是非强制类型
                        phone:"1234314",
                        detail:"粗事啦"
                        imgUrl:"http://321asd", // 图片url
                        vidiUrl:"http://23asd",// 视频url
                        status: "已处理"
                    },
                    {
                        id:'wae21123da',
                        number:2,
                        type:"非强制类型", //其实这里都是非强制类型
                        phone:"1234314",
                        detail:"粗事啦"
                        imgUrl:"http://321asd", 
                        vidiUrl:"http://23asd",
                        status: "正在处理"
                    },
                    {
                        id:'wae211233da',
                        number:3,
                        type:"非强制类型", //其实这里都是非强制类型
                        phone:"1234314",
                        detail:"粗事啦"
                        imgUrl:"http://321asd", 
                        vidiUrl:"http://23asd",
                        status: "未处理"
                    }
                    ...
                ]
            }
        }
    ```


- ### 事件检索----事件管理
    ```bash
        # POST请求    url:/api/event/search

        # 请求参数:
        {
            keyword:"123431" ，//先只考虑电话检索吧
        }

        # 返回数据:
        {
            code:number,
            message:string,
            data:{
                totalPage:1,   // 页码总数,基本上是1
                current:1,   // 当前页码
                size:10,    // 每页数据最大数量
                eventList:[

                ]
            }
        }
    ```


- ### 查看详情----事件管理(补充)
```bash
    # POST请求    url:/api/event/detail?eventId='123431'

    # 请求参数:
    {
        eventId:"123431" 
    }

    # 返回数据:
    {
        code:number,
        message:string,
        data:{
            # 上报信息
            postInfo:{
                type:'0',
                des:"下午两点。。。",  # 描述
                time:'2022-07-19 11:30:32',
                vedioUrl:'http://',
                imgUrl:'http://',
                where:"渝北区小学"
            },
            # 处置信息
            resolveInfo:{
                type:'0',
                process:"下午两点。。。",  # 处置信息
                where:"渝北区小学",
                childList:[
                    {
                        name:'',
                        sex:'男',
                        id:'500213'
                    },
                    {
                        name:'',
                        sex:'男',
                        id:'500213'
                    }
                ],
                adultList:[
                    {
                        name:'',
                        sex:'男',
                        id:'500213'
                    },
                    {
                        name:'',
                        sex:'男',
                        id:'500213'
                    }
                ]
            }
        }
    }
```