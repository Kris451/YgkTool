import * as React from "react";
import { Link } from "react-router-dom";
import { ListControlMenu, ListControlCheck, List } from "mdui-in-react";

interface ISetting {
	homeShowNewestTool: boolean;
	hitokotoTopic: number;
	theme: number;
}

function setFunc<T extends keyof ISetting>(name?: T, value?: any): ISetting {
	var originSetting: ISetting = JSON.parse(
		localStorage.getItem("setting") || "{}"
	);
	if (!name) return originSetting;
	originSetting[name] = value;
	localStorage.setItem("setting", JSON.stringify(originSetting));
	console.log(originSetting);
	return originSetting;
}

const hitokotoItems = [
	{
		name: "随机",
		value: "",
	},
	{
		name: "动漫",
		value: "a",
	},
	{
		name: "漫画",
		value: "b",
	},
	{
		name: "游戏",
		value: "c",
	},
	{
		name: "小说",
		value: "d",
	},
	{
		name: "原创",
		value: "e",
	},
	{
		name: "网络",
		value: "f",
	},
	{
		name: "其他",
		value: "g",
	},
];

export default class extends React.Component<{}, { setting: ISetting }> {
	constructor(props: {}) {
		super(props);
		this.state = {
			setting: setFunc(),
		};
	}
	componentDidMount() {
		window.updateTitle("设置");
	}
	render() {
		const {
			homeShowNewestTool = true,
			hitokotoTopic,
			theme,
		} = this.state.setting;
		return (
			<div className="mdui-col-md-10">
				<ul className="mdui-list">
					<li className="mdui-text-color-theme mdui-subheader">
						通用
					</li>

					<ListControlCheck
						icon="apps"
						title="首页展示最新工具"
						checked={homeShowNewestTool}
						onCheckedChange={(checked) => {
							this.setState({
								setting: setFunc("homeShowNewestTool", checked),
							});
						}}
					/>

					<li className="mdui-text-color-theme mdui-subheader">
						个性化
					</li>

					<ListControlMenu
						title="一言来源"
						checked={hitokotoTopic || 0}
						onCheckedChange={(checked) => {
							this.setState({
								setting: setFunc("hitokotoTopic", checked),
							});
						}}
						items={hitokotoItems}
					/>

					<ListControlMenu
						title="主题"
						checked={theme || 0}
						onCheckedChange={(checked) => {
							this.setState({
								setting: setFunc("theme", checked),
							});
							const fn = [
								() => {
									window.location.reload();
								},
								() => {
									document.body.classList.remove(
										"mdui-theme-layout-dark"
									);
								},
								() => {
									document.body.classList.add(
										"mdui-theme-layout-dark"
									);
								},
							];
							fn[checked]();
						}}
						items={[
							{
								name: "跟随系统",
								value: "auto",
							},
							{
								name: "浅色模式",
								value: "light",
							},
							{
								name: "深色模式",
								value: "dark",
							},
						]}
					/>
					<li className="mdui-text-color-theme mdui-subheader">
						联系
					</li>

					<List
						items={[
							{
								text: "到Github提交反馈",
								href:
									"https://github.com/RiverTwilight/ygktool/issues",
							},
						]}
					/>
					<List
						items={[
							{
								text: "联系开发者",
								href:
									"//wpa.qq.com/msgrd?v=3&amp;uin=1985386335&amp;site=qq&amp;menu=yes",
							},
						]}
					/>

					<li className="mdui-text-color-theme mdui-subheader">
						关于
					</li>

					<Link to="/about">
						<List
							items={[
								{
									text: "关于",
								},
							]}
						/>
					</Link>
				</ul>
			</div>
		);
	}
}