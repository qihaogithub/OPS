<template>
    <div class="IndexPage">
        <!-- 修改左侧菜单 -->
        <aside class="left-menu">
            <nav>
                <ul>
                    <li>
                        <button @click="doAddWorkspace"><Icon icon="radix-icons:card-stack-plus" /> 添加工作区</button>
                    </li>
                    <li>
                        <button @click="doCopyWorkspaceUrl"><Icon icon="radix-icons:link-2" /> 复制链接</button>
                    </li>
                    <!-- 保留原有的菜单项 -->
                    <li><a href="#">菜单项 1</a></li>
                    <li><a href="#">菜单项 2</a></li>
                    <li><a href="#">菜单项 3</a></li>
                </ul>
            </nav>
        </aside>

        <!-- 原有内容 -->
        <div class="main-content">
            <nav>
                <div class="dict-button-box" @click="toggleDictPad()">
                    提示词词典
                    <button class="icon dict-button"><Icon icon="mingcute:book-4-fill" /></button>
                </div>
            </nav>
            <PromptEditor ref="PromptEditor" :init-prompts="initPrompts" />
            <section class="PromptDictPad" v-if="needDictPad" v-show="showDictPad">
                <div class="title">
                    <Icon icon="mingcute:book-4-fill" />
                    提示词词典
                    <!--                <a class="github-dict" href="https://github.com/Moonvy/OpenPromptStudio" target="_blank">-->
                    <!--                    <Icon icon="radix-icons:github-logo" />一起维护词典</a-->
                    <!--                >-->
                    <button class="icon close-button" @click="toggleDictPad(false)">
                        <Icon icon="radix-icons:cross-1" />
                    </button>
                </div>
                <PromptDict />
            </section>
        </div>
    </div>
</template>
<style lang="scss">
.IndexPage {
    display: flex; // 使用 flex 布局

    .left-menu {
        width: 200px; // 设置菜单宽度
        height: 100vh; // 设置菜单度为全屏
        background-color: #f0f0f0; // 设置背景色
        padding: 20px;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); // 添加阴影效果

        nav {
            ul {
                list-style-type: none;
                padding: 0;

                li {
                    margin-bottom: 10px;

                    button,
                    a {
                        display: flex;
                        align-items: center;
                        text-decoration: none;
                        color: #333;
                        font-size: 16px;
                        background: none;
                        border: none;
                        cursor: pointer;
                        padding: 0;

                        &:hover {
                            color: #6161b7;
                        }

                        .iconify {
                            margin-right: 8px;
                        }
                    }
                }
            }
        }
    }

    .main-content {
        flex: 1; // 主内容区域占据剩余空间
        > nav {
            display: flex;
            place-items: center;
            padding-top: 11px;
            padding-bottom: 20px;
            padding-left: 23px;
            padding-right: 14px;
            .logo {
                font-family: "JetBrains Mono";
                color: #9f9f9f;
                text-shadow: 0 1px 1px #ffffff;
                display: flex;
                place-items: center;
                font-weight: 200;
                display: flex;
                place-content: flex-start;
                text-decoration: none;
            }

            .icon-link {
                display: flex;
                place-items: center;
                font-size: 18px;
                color: #888686;
                text-shadow: 0 1px 1px #ffffff;
                margin-left: 6px;
            }

            .dict-button-box {
                margin-left: auto;
                display: flex;
                font-size: 14px;
                place-items: center;
                color: #6161b7;
                text-shadow: 0 1px 1px #ffffff;
                margin-right: 40px;
                cursor: pointer;
            }
            .dict-button {
                color: #6161b7;
                margin-left: 6px;
                position: fixed;
                right: 20px;
                top: 14px;
                z-index: 50;
            }
        }

        > footer {
            display: flex;
            place-content: flex-end;
            place-items: center;
            padding-bottom: 20px;
            padding-top: 32px;
            padding-right: 20px;
            border-top: 1px solid #d7d7d7;
            box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9215686275) inset;

            a {
                display: flex;
                place-content: flex-end;
                place-items: center;
                text-decoration: none;
                color: #4b4a4a;
                font-family: "JetBrains Mono";
                font-size: 13px;
                img {
                    margin-left: 6px;
                    height: 21px;
                }

                .icon {
                    margin-right: 0.5em;
                }

                &:not(:last-child) {
                    margin-right: 0.5em;
                }
            }
        }

        > .PromptDictPad {
            position: fixed;
            display: flex;
            flex-direction: column;
            top: 0;
            right: 0;
            width: 550px;
            height: 100vh;
            z-index: 100;
            max-width: calc(100vw - 100px);
            background: rgb(247 247 247 / 71%);
            backdrop-filter: blur(32px);
            box-shadow: -2px 0 2px #26252512, -2px 0 12px #26252521, -2px 0 64px #0605491f;

            > .title {
                display: flex;
                place-items: center;
                padding: 14px 20px;
                font-size: 14px;
                color: #6161b7;
                text-shadow: 0 1px 1px #ffffff;
                font-weight: bold;
                > .iconify {
                    font-size: 22px;
                    margin-right: 8px;
                    filter: drop-shadow(0 1px 1px #ffffff);
                    color: #6161b7;
                }

                > .close-button {
                    margin-left: auto;
                }

                .github-dict {
                    display: flex;
                    place-items: center;
                    text-decoration: none;
                    margin-left: 12px;
                    font-weight: normal;
                    color: #7a78dc;
                    &:hover {
                        text-decoration: underline;
                    }
                    .iconify {
                        margin-right: 4px;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 1550px) {
    .IndexPage > footer {
        padding-top: 92px;
    }
}
</style>
<script lang="ts">
import Vue, { PropType } from "vue"
import vPromptEditor from "../../Compoents/PromptEditor/PromptEditor.vue"
import vPromptDict from "../../Compoents/PromptDict/PromptDict.vue"
import { useClipboard } from "@vueuse/core"

import pkg from "../../../package.json"
export default Vue.extend({
    data() {
        return {
            showDictPad: false,
            needDictPad: false,
            version: pkg.version,
            initPrompts: null,
        }
    },
    methods: {
        toggleDictPad(show?: boolean) {
            this.showDictPad = show ?? !this.showDictPad
            if (this.showDictPad) this.needDictPad = true
        },

        getPromptsFromUrlQuery() {
            if (this.$route?.query?.prompts) {
                try {
                    let prompts = JSON.parse(<any>this.$route.query.prompts)
                    console.log("[getPromptsFromUrlQuery]:", prompts)
                    this.initPrompts = prompts

                    let newQuery = Object.assign({}, this.$route.query)
                    delete newQuery.prompts
                    this.$router.replace({ query: newQuery })
                } catch (e) {
                    console.error(e)
                }
            }
        },
        doAddWorkspace() {
            const promptEditor = this.$refs.PromptEditor as any
            promptEditor.promptEditor.addWorkspace()
        },
        doCopyWorkspaceUrl() {
            const promptEditor = this.$refs.PromptEditor as any
            let prompts = promptEditor.promptEditor.works.map((w: any) => w.exportPrompts())
            let q = encodeURIComponent(JSON.stringify(prompts))
            let url = `${location.origin + location.pathname}?prompts=${q}`
            const { copy } = useClipboard({ legacy: true })
            copy(url)
        },
    },
    components: {
        PromptEditor: <any>vPromptEditor,
        PromptDict: vPromptDict,
    },
    created() {
        this.getPromptsFromUrlQuery()
    },
})
</script>
