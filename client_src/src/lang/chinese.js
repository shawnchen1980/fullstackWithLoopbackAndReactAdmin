export default {
  ra: {
    action: {
      delete: "删除",
      show: "查看",
      list: "列表",
      save: "保存",
      create: "新建",
      edit: "编辑",
      sort: "排序",
      cancel: "取消",
      undo: "撤销",
      refresh: "刷新",
      add: "增加",
      remove: "删除",
      add_filter: "增加检索",
      remove_filter: "移除检索",
      back: "回退",
      bulk_actions: "选中%{smart_count}项",
      export: "导出",
      search: "检索",
      show: "显示"
    },
    boolean: {
      true: "是",
      false: "否"
    },
    page: {
      list: "%{name} 列表",
      edit: "%{name} #%{id}",
      show: "%{name} #%{id}",
      create: "新建 %{name}",
      dashboard: "概览",
      not_found: "未发现",
      loading: "加载中",
      error: "出现错误"
    },
    input: {
      file: {
        upload_several: "将文件集合拖拽到这里, 或点击这里选择文件集合.",
        upload_single: "将文件拖拽到这里, 或点击这里选择文件."
      },
      image: {
        upload_several: "将图片文件集合拖拽到这里, 或点击这里选择图片文件集合.",
        upload_single: "将图片文件拖拽到这里, 或点击这里选择图片文件."
      },
      references: {
        all_missing: "未找到参考数据.",
        many_missing: "至少有一条参考数据不再可用.",
        single_missing: "关联的参考数据不再可用."
      }
    },
    message: {
      yes: "是",
      no: "否",
      are_you_sure: "您确定操作?",
      about: "关于",
      not_found: "您输入了错误的URL或者错误的链接.",
      loading: "正在加载页面, 请稍候",
      invalid_form: "表单输入无效. 请检查错误提示",
      delete_title: "删除 %{name} #%{id}",
      delete_content: "您确定要删除该条目?",
      bulk_delete_title: "删除 %{name} |||| 删除 %{smart_count}项 %{name} ",
      bulk_delete_content:
        "您确定要删除 %{name}? |||| 您确定要删除 %{smart_count} 项?"
    },
    navigation: {
      no_results: "结果为空",
      no_more_results: "页码 %{page} 超出边界. 试试上一页.",
      page_out_of_boundaries: "页码 %{page} 超出边界",
      page_out_from_end: "已到最末页",
      page_out_from_begin: "已到最前页",
      page_range_info: "%{offsetBegin}-%{offsetEnd} / %{total}",
      page_rows_per_page: "每页行数:",
      next: "向后",
      prev: "向前"
    },
    auth: {
      user_menu: "设置",
      username: "用户名",
      email: "邮箱",
      password: "密码",
      passRepeat: "再次确认密码",
      sign_in: "登录",
      sign_up: "注册",
      sign_up_success: "注册成功,请登录",
      sign_up_failure: "注册失败,请重试",
      sign_in_error: "验证失败, 请重试",
      logout: "退出"
    },
    notification: {
      updated: "条目已更新 |||| %{smart_count} 项条目已更新",
      created: "条目已新建",
      deleted: "条目已删除 |||| %{smart_count} 项条目已删除",
      bad_item: "不正确的条目",
      item_doesnt_exist: "条目不存在",
      http_error: "与服务通信出错",
      canceled: "取消动作",
      data_provider_error: "dataProvider错误. 请检查console的详细信息.",
      canceled: "取消动作"
    },
    validation: {
      required: "必填",
      minLength: "必须不少于 %{min} 个字符",
      maxLength: "必须不多于 %{max} 个字符",
      minValue: "必须不小于 %{min}",
      maxValue: "必须不大于 %{max}",
      number: "必须为数字",
      email: "必须是有效的邮箱",
      passRepeat: "密码两次输入不一致",
      oneOf: "必须为: %{options}其中一项",
      regex: "必须符合指定的格式 (regexp): %{pattern}"
    }
  }
};
