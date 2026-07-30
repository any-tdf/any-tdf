<script lang="ts">
	import { AsyncPicker, Cell } from 'stdf';
	// 为避免 Demo 页面杂乱，具体参考数据放在 data.js 文件内，可查看此页面底部注释。
	import { linkageData, linkageDiffLabeData } from './data.js';

	let visible1 = $state(false);
	let visible2 = $state(false);
	let visible3 = $state(false);
	let visible4 = $state(false);
	let visible5 = $state(false);
	let visible6 = $state(false);
	let visible7 = $state(false);
	let visible8 = $state(false);
	let visible9 = $state(false);

	let data: { label: string; children: { label: string; children: { label: string }[] }[] }[] = $state(linkageData);
	let currentLevel = $state(0);
	let lastLevel = $state(false);
	let firstLevel = $state(true);
	let level1Data = $state(linkageData[0].children);
	let titleBind = $state('请选择省级');

	// 模拟 2 秒后获取到数据
	const nextFunc = (index: number) => {
		if (currentLevel === 0) {
			const nextData = linkageData[index].children;
			level1Data = nextData;
			setTimeout(() => {
				data = nextData as { label: string; children: { label: string; children: { label: string }[] }[] }[];
				currentLevel = 1;
				titleBind = '请选择市级';
				firstLevel = false;
			}, 2000);
		} else if (currentLevel === 1) {
			const nextData = level1Data[index].children;
			setTimeout(() => {
				data = nextData as { label: string; children: { label: string; children: { label: string }[] }[] }[];
				currentLevel = 2;
				titleBind = '请选择区级';
				lastLevel = true;
			}, 2000);
		} else {
			console.log('最后一级');
		}
	};
	const prevFunc = () => {
		if (currentLevel === 1) {
			const prevData = linkageData;
			setTimeout(() => {
				data = prevData;
				currentLevel = 0;
				titleBind = '请选择省级';
				firstLevel = true;
			}, 2000);
		} else if (currentLevel === 2) {
			const prevData = level1Data;
			setTimeout(() => {
				data = prevData as { label: string; children: { label: string; children: { label: string }[] }[] }[];
				currentLevel = 1;
				titleBind = '请选择市级';
				lastLevel = false;
			}, 2000);
		} else {
			console.log('第一级');
		}
	};

	let allIndexs: number[] = $state([]);
	let allItems: { label: string }[] = $state([]);
	const getAllDataFunc = (items: { label: string }[], indexs: number[]) => {
		allItems = items;
		allIndexs = indexs;
	};

	// 每一级对应的 labelKey 不同时的处理逻辑
	type DiffLabelKeyDataCity = { city: string; children: { region: string }[] };
	type DiffLabelKeyData = { province: string; children: DiffLabelKeyDataCity[] };
	let diffLabelKeyData: DiffLabelKeyData[] = $state(linkageDiffLabeData);
	let labelKey = $state('province');
	let diffLabelKeyCurrentLevel = $state(0);
	let diffLabelKeyLastLevel = $state(false);
	let diffLabelKeyFirstLevel = $state(true);
	let diffLabelKeyLevel1Data: DiffLabelKeyDataCity[] = $state(linkageDiffLabeData[0].children);
	const diffLabelKeyNextFunc = (index: number) => {
		if (diffLabelKeyCurrentLevel === 0) {
			const nextData: DiffLabelKeyDataCity[] = linkageDiffLabeData[index].children;
			diffLabelKeyLevel1Data = nextData;
			setTimeout(() => {
				diffLabelKeyData = nextData as unknown as DiffLabelKeyData[];
				labelKey = 'city';
				diffLabelKeyCurrentLevel = 1;
				diffLabelKeyFirstLevel = false;
			}, 2000);
		} else if (diffLabelKeyCurrentLevel === 1) {
			const nextData = diffLabelKeyLevel1Data[index].children;
			setTimeout(() => {
				diffLabelKeyData = nextData as unknown as DiffLabelKeyData[];
				diffLabelKeyCurrentLevel = 2;
				labelKey = 'region';
				diffLabelKeyLastLevel = true;
			}, 2000);
		} else {
			console.log('最后一级');
		}
	};
	const diffLabelKeyPrevFunc = () => {
		if (diffLabelKeyCurrentLevel === 1) {
			const prevData = linkageDiffLabeData;
			setTimeout(() => {
				diffLabelKeyData = prevData as unknown as DiffLabelKeyData[];
				diffLabelKeyCurrentLevel = 0;
				diffLabelKeyFirstLevel = true;
				labelKey = 'province';
			}, 2000);
		} else if (diffLabelKeyCurrentLevel === 2) {
			const prevData = diffLabelKeyLevel1Data;
			setTimeout(() => {
				diffLabelKeyData = prevData as unknown as DiffLabelKeyData[];
				diffLabelKeyCurrentLevel = 1;
				labelKey = 'city';
				diffLabelKeyLastLevel = false;
			}, 2000);
		} else {
			console.log('第一级');
		}
	};

	// 不使用弹出层的状态
	let inlineData: { label: string; children: { label: string; children: { label: string }[] }[] }[] = $state(linkageData);
	let inlineCurrentLevel = $state(0);
	let inlineLastLevel = $state(false);
	let inlineFirstLevel = $state(true);
	let inlineLevel1Data = $state(linkageData[0].children);
	const inlineNextFunc = (index: number) => {
		if (inlineCurrentLevel === 0) {
			const nextData = linkageData[index].children;
			inlineLevel1Data = nextData;
			inlineData = [];
			setTimeout(() => {
				inlineData = nextData as { label: string; children: { label: string; children: { label: string }[] }[] }[];
				inlineCurrentLevel = 1;
				inlineFirstLevel = false;
			}, 1000);
		} else if (inlineCurrentLevel === 1) {
			const nextData = inlineLevel1Data[index].children;
			inlineData = [];
			setTimeout(() => {
				inlineData = nextData as { label: string; children: { label: string; children: { label: string }[] }[] }[];
				inlineCurrentLevel = 2;
				inlineLastLevel = true;
			}, 1000);
		}
	};
	const inlinePrevFunc = () => {
		if (inlineCurrentLevel === 1) {
			inlineData = [];
			setTimeout(() => {
				inlineData = linkageData;
				inlineCurrentLevel = 0;
				inlineFirstLevel = true;
			}, 1000);
		} else if (inlineCurrentLevel === 2) {
			inlineData = [];
			setTimeout(() => {
				inlineData = inlineLevel1Data as { label: string; children: { label: string; children: { label: string }[] }[] }[];
				inlineCurrentLevel = 1;
				inlineLastLevel = false;
			}, 1000);
		}
	};
</script>

<div class="py-4">
	<div class="px-4">
		{#if allItems.length}
			当前选定了：
			{#each allItems as item}
				<span class="mr-2 text-primary dark:text-dark">{item.label}</span>
			{/each}
		{:else}
			<div>请选定数据</div>
		{/if}
	</div>
	<div class="px-4">
		{#if allIndexs.length}
			当前选定值位于所在列的索引值分别为：
			{#each allIndexs as index}
				<span class="mr-2 text-primary dark:text-dark">{index}</span>
			{/each}
		{:else}
			<div>请选定数据</div>
		{/if}
	</div>
	<Cell
		title="基础用法"
		onclick={() => {
			visible1 = true;
			data = linkageData;
			lastLevel = false;
			firstLevel = true;
			currentLevel = 0;
			level1Data = linkageData[0].children;
		}}
	/>
	<AsyncPicker
		bind:visible={visible1}
		bind:data
		bind:lastLevel
		bind:firstLevel
		onnext={nextFunc}
		onprev={prevFunc}
		onconfirm={getAllDataFunc as (items: Record<string, unknown>[], indexs: number[]) => void}
	/>

	<Cell
		title="可见 7 行数为"
		onclick={() => {
			visible2 = true;
			data = linkageData;
			lastLevel = false;
			firstLevel = true;
			currentLevel = 0;
			level1Data = linkageData[0].children;
		}}
	/>
	<AsyncPicker bind:visible={visible2} bind:data bind:lastLevel bind:firstLevel onnext={nextFunc} onprev={prevFunc} showRow={7} />

	<Cell
		title="左对齐"
		onclick={() => {
			visible3 = true;
			data = linkageData;
			lastLevel = false;
			firstLevel = true;
			currentLevel = 0;
			level1Data = linkageData[0].children;
		}}
	/>
	<AsyncPicker bind:visible={visible3} bind:data bind:lastLevel bind:firstLevel align="left" onnext={nextFunc} onprev={prevFunc} />

	<Cell
		title="自定义上下一步文字"
		onclick={() => {
			visible5 = true;
			data = linkageData;
			lastLevel = false;
			firstLevel = true;
			currentLevel = 0;
			level1Data = linkageData[0].children;
		}}
	/>
	<AsyncPicker
		bind:visible={visible5}
		bind:data
		bind:lastLevel
		bind:firstLevel
		onnext={nextFunc}
		onprev={prevFunc}
		nextText="继续"
		prevText="返回"
	/>

	<Cell
		title="不同级别使用不同的 labelKey"
		onclick={() => {
			visible4 = true;
			diffLabelKeyData = linkageDiffLabeData;
			labelKey = 'province';
			diffLabelKeyCurrentLevel = 0;
			diffLabelKeyLastLevel = false;
			diffLabelKeyFirstLevel = true;
			diffLabelKeyLevel1Data = linkageDiffLabeData[0].children;
		}}
	/>
	<AsyncPicker
		bind:visible={visible4}
		bind:data={diffLabelKeyData}
		bind:lastLevel={diffLabelKeyLastLevel}
		bind:firstLevel={diffLabelKeyFirstLevel}
		bind:labelKey
		onnext={diffLabelKeyNextFunc}
		onprev={diffLabelKeyPrevFunc}
	/>

	<Cell
		title="换一个 Loading 效果"
		onclick={() => {
			visible6 = true;
			data = linkageData;
			lastLevel = false;
			firstLevel = true;
			currentLevel = 0;
			level1Data = linkageData[0].children;
		}}
	/>
	<AsyncPicker
		bind:visible={visible6}
		bind:data
		bind:lastLevel
		bind:firstLevel
		onnext={nextFunc}
		onprev={prevFunc}
		loading={{ type: '1_15', width: '12', height: '12' }}
	/>

	<Cell
		title="顶部来点圆角"
		onclick={() => {
			visible8 = true;
			data = linkageData;
			lastLevel = false;
			firstLevel = true;
			currentLevel = 0;
			level1Data = linkageData[0].children;
		}}
	/>
	<AsyncPicker
		bind:visible={visible8}
		bind:data
		bind:lastLevel
		bind:firstLevel
		onnext={nextFunc}
		onprev={prevFunc}
		popup={{ radius: 'xl' }}
	/>

	<Cell
		title="显示已选选项"
		onclick={() => {
			visible7 = true;
			data = linkageData;
			lastLevel = false;
			firstLevel = true;
			currentLevel = 0;
			level1Data = linkageData[0].children;
		}}
	/>
	<AsyncPicker bind:visible={visible7} bind:data bind:lastLevel bind:firstLevel onnext={nextFunc} onprev={prevFunc} showSelected />

	<Cell
		title="动态改变标题"
		onclick={() => {
			visible9 = true;
			data = linkageData;
			lastLevel = false;
			firstLevel = true;
			currentLevel = 0;
			titleBind = '请选择省级';
			level1Data = linkageData[0].children;
		}}
	/>
	<AsyncPicker
		bind:visible={visible9}
		bind:data
		bind:lastLevel
		bind:firstLevel
		bind:title={titleBind}
		onnext={nextFunc}
		onprev={prevFunc}
	/>

	<div class="px-4 py-2">不使用弹出层</div>
	<AsyncPicker
		popup={null}
		bind:data={inlineData}
		bind:lastLevel={inlineLastLevel}
		bind:firstLevel={inlineFirstLevel}
		onnext={inlineNextFunc}
		onprev={inlinePrevFunc}
		height={30}
	/>
</div>
<!--
const linkageData = [
    {
        label: '云南',
        children: [
            {
                label: '昆明',
                children: [
                    { label: '盘龙区' },
                    { label: '五华区' },
                    { label: '官渡区' },
                    { label: '西山区' },
                    { label: '东川区' },
                    { label: '呈贡区' },
                    { label: '晋宁区' },
                    { label: '富民县' },
                    { label: '宜良县' },
                    { label: '石林彝族自治县' },
                    { label: '嵩明县' },
                    { label: '禄劝彝族苗族自治县' },
                    { label: '寻甸回族彝族自治县' },
                    { label: '安宁市' },
                ],
            },
            {
                label: '曲靖',
                children: [
                    { label: '麒麟区' },
                    { label: '沾益区' },
                    { label: '马龙县' },
                    { label: '陆良县' },
                    { label: '师宗县' },
                    { label: '罗平县' },
                    { label: '富源县' },
                    { label: '会泽县' },
                    { label: '宣威市' },
                ],
            },
            {
                label: '玉溪',
                children: [
                    { label: '红塔区' },
                    { label: '江川区' },
                    { label: '澄江县' },
                    { label: '通海县' },
                    { label: '华宁县' },
                    { label: '易门县' },
                    { label: '峨山彝族自治县' },
                    { label: '新平彝族傣族自治县' },
                    { label: '元江哈尼族彝族傣族自治县' },
                ],
            },
            {
                label: '保山',
                children: [
                    { label: '隆阳区' },
                    { label: '施甸县' },
                    { label: '龙陵县' },
                    { label: '昌宁县' },
                    { label: '腾冲市' },
                    { label: '龙陵县' },
                ],
            },
            {
                label: '丽江',
                children: [
                    { label: '古城区' },
                    { label: '永胜县' },
                    { label: '华坪县' },
                    { label: '玉龙纳西族自治县' },
                    { label: '宁蒗彝族自治县' },
                ],
            },
            {
                label: '普洱',
                children: [
                    { label: '思茅区' },
                    { label: '宁洱哈尼族彝族自治县' },
                    { label: '墨江哈尼族自治县' },
                    { label: '景东彝族自治县' },
                    { label: '景谷傣族彝族自治县' },
                    { label: '镇沅彝族哈尼族拉祜族自治县' },
                    { label: '江城哈尼族彝族自治县' },
                    { label: '孟连傣族拉祜族佤族自治县' },
                    { label: '澜沧拉祜族自治县' },
                    { label: '西盟佤族自治县' },
                ],
            },
            {
                label: '临沧',
                children: [
                    { label: '临翔区' },
                    { label: '凤庆县' },
                    { label: '云县' },
                    { label: '永德县' },
                    { label: '镇康县' },
                    { label: '双江拉祜族佤族布朗族傣族自治县' },
                    { label: '耿马傣族佤族自治县' },
                    { label: '沧源佤族自治县' },
                ],
            },
            {
                label: '楚雄',
                children: [
                    { label: '楚雄市' },
                    { label: '双柏县' },
                    { label: '牟定县' },
                    { label: '南华县' },
                    { label: '姚安县' },
                    { label: '大姚县' },
                    { label: '永仁县' },
                    { label: '元谋县' },
                    { label: '武定县' },
                    { label: '禄丰县' },
                ],
            },
            {
                label: '红河',
                children: [
                    { label: '个旧市' },
                    { label: '开远市' },
                    { label: '蒙自市' },
                    { label: '弥勒市' },
                    { label: '屏边苗族自治县' },
                    { label: '建水县' },
                    { label: '石屏县' },
                    { label: '泸西县' },
                    { label: '元阳县' },
                    { label: '红河县' },
                    { label: '金平苗族瑶族傣族自治县' },
                    { label: '绿春县' },
                    { label: '河口瑶族自治县' },
                ],
            },
            {
                label: '文山',
                children: [
                    { label: '文山市' },
                    { label: '砚山县' },
                    { label: '西畴县' },
                    { label: '麻栗坡县' },
                    { label: '马关县' },
                    { label: '丘北县' },
                    { label: '广南县' },
                    { label: '富宁县' },
                ],
            },
        ],
    },
    {
        label: '广东',
        children: [
            {
                label: '广州',
                children: [
                    { label: '天河区' },
                    { label: '海珠区' },
                    { label: '荔湾区' },
                    { label: '越秀区' },
                    { label: '白云区' },
                    { label: '黄埔区' },
                ],
            },
            {
                label: '深圳',
                children: [
                    { label: '罗湖区' },
                    { label: '福田区' },
                    { label: '南山区' },
                    { label: '宝安区' },
                    { label: '龙岗区' },
                    { label: '盐田区' },
                ],
            },
            {
                label: '珠海',
                children: [{ label: '香洲区' }, { label: '斗门区' }, { label: '金湾区' }],
            },
            {
                label: '汕头',
                children: [
                    { label: '龙湖区' },
                    { label: '金平区' },
                    { label: '濠江区' },
                    { label: '潮阳区' },
                    { label: '潮南区' },
                    { label: '澄海区' },
                ],
            },
            {
                label: '佛山',
                children: [{ label: '禅城区' }, { label: '南海区' }, { label: '顺德区' }, { label: '三水区' }, { label: '高明区' }],
            },
        ],
    },
    {
        label: '四川',
        children: [
            {
                label: '成都',
                children: [
                    { label: '锦江区' },
                    { label: '青羊区' },
                    { label: '金牛区' },
                    { label: '武侯区' },
                    { label: '成华区' },
                    { label: '龙泉驿区' },
                ],
            },
            {
                label: '绵阳',
                children: [
                    { label: '涪城区' },
                    { label: '游仙区' },
                    { label: '安州区' },
                    { label: '三台县' },
                    { label: '盐亭县' },
                    { label: '梓潼县' },
                ],
            },
            {
                label: '自贡',
                children: [
                    { label: '自流井区' },
                    { label: '贡井区' },
                    { label: '大安区' },
                    { label: '沿滩区' },
                    { label: '荣县' },
                    { label: '富顺县' },
                ],
            },
            {
                label: '攀枝花',
                children: [{ label: '东区' }, { label: '西区' }, { label: '仁和区' }, { label: '米易县' }, { label: '盐边县' }],
            },
        ],
    },
    {
        label: '北京',
        children: [
            {
                label: '北京市',
                children: [
                    { label: '东城区' },
                    { label: '西城区' },
                    { label: '朝阳区' },
                    { label: '丰台区' },
                    { label: '石景山区' },
                    { label: '海淀区' },
                ],
            },
        ],
    },
    {
        label: '浙江',
        children: [
            {
                label: '杭州',
                children: [
                    { label: '上城区' },
                    { label: '下城区' },
                    { label: '江干区' },
                    { label: '拱墅区' },
                    { label: '西湖区' },
                    { label: '滨江区' },
                ],
            },
            {
                label: '宁波',
                children: [
                    { label: '海曙区' },
                    { label: '江东区' },
                    { label: '江北区' },
                    { label: '北仑区' },
                    { label: '镇海区' },
                    { label: '鄞州区' },
                ],
            },
            {
                label: '温州',
                children: [
                    { label: '鹿城区' },
                    { label: '龙湾区' },
                    { label: '瓯海区' },
                    { label: '洞头区' },
                    { label: '永嘉县' },
                    { label: '平阳县' },
                ],
            },
            {
                label: '嘉兴',
                children: [
                    { label: '南湖区' },
                    { label: '秀洲区' },
                    { label: '嘉善县' },
                    { label: '海盐县' },
                    { label: '海宁市' },
                    { label: '平湖市' },
                ],
            },
            {
                label: '湖州',
                children: [{ label: '吴兴区' }, { label: '南浔区' }, { label: '德清县' }, { label: '长兴县' }, { label: '安吉县' }],
            },
        ],
    },
];

const linkageDiffLabeData = [
    {
        province: '云南',
        children: [
            {
                city: '昆明',
                children: [
                    { region: '盘龙区' },
                    { region: '五华区' },
                    { region: '官渡区' },
                    { region: '西山区' },
                    { region: '东川区' },
                    { region: '呈贡区' },
                    { region: '晋宁区' },
                    { region: '富民县' },
                    { region: '宜良县' },
                    { region: '石林彝族自治县' },
                    { region: '嵩明县' },
                    { region: '禄劝彝族苗族自治县' },
                    { region: '寻甸回族彝族自治县' },
                    { region: '安宁市' },
                ],
            },
            {
                city: '曲靖',
                children: [
                    { region: '麒麟区' },
                    { region: '沾益区' },
                    { region: '马龙县' },
                    { region: '陆良县' },
                    { region: '师宗县' },
                    { region: '罗平县' },
                    { region: '富源县' },
                    { region: '会泽县' },
                    { region: '宣威市' },
                ],
            },
            {
                city: '玉溪',
                children: [
                    { region: '红塔区' },
                    { region: '江川区' },
                    { region: '澄江县' },
                    { region: '通海县' },
                    { region: '华宁县' },
                    { region: '易门县' },
                    { region: '峨山彝族自治县' },
                    { region: '新平彝族傣族自治县' },
                    { region: '元江哈尼族彝族傣族自治县' },
                ],
            },
            {
                city: '保山',
                children: [
                    { region: '隆阳区' },
                    { region: '施甸县' },
                    { region: '龙陵县' },
                    { region: '昌宁县' },
                    { region: '腾冲市' },
                    { region: '龙陵县' },
                ],
            },
            {
                city: '丽江',
                children: [
                    { region: '古城区' },
                    { region: '永胜县' },
                    { region: '华坪县' },
                    { region: '玉龙纳西族自治县' },
                    { region: '宁蒗彝族自治县' },
                ],
            },
            {
                city: '普洱',
                children: [
                    { region: '思茅区' },
                    { region: '宁洱哈尼族彝族自治县' },
                    { region: '墨江哈尼族自治县' },
                    { region: '景东彝族自治县' },
                    { region: '景谷傣族彝族自治县' },
                    { region: '镇沅彝族哈尼族拉祜族自治县' },
                    { region: '江城哈尼族彝族自治县' },
                    { region: '孟连傣族拉祜族佤族自治县' },
                    { region: '澜沧拉祜族自治县' },
                    { region: '西盟佤族自治县' },
                ],
            },
        ],
    },
    {
        province: '广东',
        children: [
            {
                city: '广州',
                children: [
                    { region: '天河区' },
                    { region: '海珠区' },
                    { region: '荔湾区' },
                    { region: '越秀区' },
                    { region: '白云区' },
                    { region: '黄埔区' },
                ],
            },
            {
                city: '深圳',
                children: [
                    { region: '罗湖区' },
                    { region: '福田区' },
                    { region: '南山区' },
                    { region: '宝安区' },
                    { region: '龙岗区' },
                    { region: '盐田区' },
                ],
            },
        ],
    },
];

export { linkageData, linkageDiffLabeData }; -->
