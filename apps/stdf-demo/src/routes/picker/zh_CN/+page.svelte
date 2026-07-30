<!-- Picker Demo -->
<script lang="ts">
	import { Picker, Cell } from 'stdf';
	// 为避免 Demo 页面杂乱，具体参考数据放在 data.js 文件内，可查看此页面底部注释。
	import {
		someProvinceList,
		weekList,
		amOrPmList,
		timeList,
		cityList,
		linkageData,
		linkagDiffLabelKeyData,
		linkagCustomChildrenKeyData
	} from './data.js';

	const datas = [{ data: someProvinceList }];

	const col3Datas = [{ data: weekList }, { data: amOrPmList }, { data: timeList }];

	let visible1 = $state(false);
	let visible2 = $state(false);
	let visible3 = $state(false);
	let visible4 = $state(false);
	let visible5 = $state(false);
	let visible6 = $state(false);
	let visible7 = $state(false);
	let visible8 = $state(false);
	let visible9 = $state(false);
	let visible10 = $state(false);
	let visible11 = $state(false);
	let visible12 = $state(false);
	let visible13 = $state(false);
	let visible14 = $state(false);
	let visible15 = $state(false);
	let visible16 = $state(false);
	let visible17 = $state(false);
	let visible18 = $state(false);
	let visible19 = $state(false);
	let visible20 = $state(false);
	let visible21 = $state(false);
	let visible22 = $state(false);
	let visible23 = $state(false);
	let visible24 = $state(false);
	let visible25 = $state(false);

	let currentDetail = $state('请选择');
	let allItems: { [key: string]: string }[] = $state([]);
	let allIndexs: number[] = $state([]);

	// 多选相关
	import type { PickerMultipleItem } from 'stdf/types';
	let multipleSelected1: PickerMultipleItem[] = $state([]);
	let multipleSelected2: PickerMultipleItem[] = $state([]);
	let multipleSelected3: PickerMultipleItem[] = $state([]);
</script>

<div class="py-4">
	<Cell title="基础用法" onclick={() => (visible1 = true)} />
	<Picker bind:visible={visible1} {datas} />

	<Cell title="自定义标题" onclick={() => (visible2 = true)} />
	<Picker bind:visible={visible2} title="请选择省份" {datas} />

	<Cell title="可见 7 行" onclick={() => (visible3 = true)} />
	<Picker bind:visible={visible3} datas={[{ data: someProvinceList, showRow: 7 }]} />

	<Cell title="关闭自动滚动至上次选定项" onclick={() => (visible4 = true)} />
	<Picker bind:visible={visible4} {datas} autoScrollToLast={false} />

	<Cell title="初始选定始终为第 4 项" onclick={() => (visible5 = true)} subTitle="需要关闭自动选定上次选中项" />
	<Picker bind:visible={visible5} datas={[{ data: someProvinceList, initIndex: 3 }]} autoScrollToLast={false} />

	<Cell title="自动滚动时取消动画" onclick={() => (visible6 = true)} />
	<Picker bind:visible={visible6} datas={[{ data: someProvinceList, useAnimation: false }]} />

	<Cell title="自定义 label 的 key 值" onclick={() => (visible7 = true)} />
	<Picker bind:visible={visible7} datas={[{ data: cityList, labelKey: 'cityName' }]} title="请选择城市" />

	<Cell title="右侧展示选定项" detail={currentDetail} onclick={() => (visible8 = true)} />
	<Picker bind:visible={visible8} {datas} onconfirm={(items) => (currentDetail = items[0].label)} />

	<Cell title="单列左对齐" onclick={() => (visible20 = true)} />
	<Picker bind:visible={visible20} datas={[{ data: someProvinceList, align: 'left' }]} />

	<Cell title="多列选择器" onclick={() => (visible9 = true)} />
	<Picker bind:visible={visible9} datas={col3Datas} />

	<Cell title="不同列可见行数" onclick={() => (visible10 = true)} />
	<Picker bind:visible={visible10} datas={[{ data: weekList }, { data: amOrPmList, showRow: 3 }, { data: timeList, showRow: 7 }]} />

	<Cell title="不同列 flex 比例" onclick={() => (visible11 = true)} />
	<Picker
		bind:visible={visible11}
		datas={[
			{ data: weekList, flex: 3 },
			{ data: amOrPmList, flex: 1 },
			{ data: timeList, flex: 2 }
		]}
	/>

	<Cell title="多列不同对齐方式" onclick={() => (visible21 = true)} />
	<Picker
		bind:visible={visible21}
		datas={[
			{ data: weekList, align: 'left' },
			{ data: amOrPmList, align: 'center' },
			{ data: timeList, align: 'right' }
		]}
	/>

	<Cell title="多级联动" onclick={() => (visible12 = true)} />
	<Picker bind:visible={visible12} datas={linkageData} isLinkage />

	<Cell title="多级联动不同可见行数" onclick={() => (visible13 = true)} />
	<Picker bind:visible={visible13} datas={linkageData} linkageShowRows={[3, 5, 7]} isLinkage />

	<Cell title="多级联动不同 flex 比例" onclick={() => (visible14 = true)} />
	<Picker bind:visible={visible14} datas={linkageData} linkageFlexs={[1, 2, 3]} isLinkage />

	<Cell title="多级联动自定义每级 label 的 key 值" onclick={() => (visible15 = true)} />
	<Picker bind:visible={visible15} datas={linkagDiffLabelKeyData} linkageLabelKeys={['province', 'city', 'region']} isLinkage />

	<Cell title="多级联动自定义上下级 children 的 key 值" onclick={() => (visible16 = true)} />
	<Picker bind:visible={visible16} datas={linkagCustomChildrenKeyData} linkageChildrenKey="child" isLinkage />

	<Cell title="联动不同对齐方式" onclick={() => (visible22 = true)} />
	<Picker bind:visible={visible22} datas={linkageData} linkageAligns={['right', 'center', 'left']} isLinkage />

	<Cell title="多级联动设置每列初始选定项" onclick={() => (visible17 = true)} />
	<Picker bind:visible={visible17} datas={linkageData} linkageInitIndexs={[0, 1, 8]} isLinkage />

	<div class="px-4">
		{#if allItems.length}
			当前选定了：
			{#each allItems as item, index (index)}
				<span class=" text-primary dark:text-dark mr-2">{item.label}</span>
			{/each}
		{:else}
			<div>请选定数据</div>
		{/if}
	</div>
	<div class="px-4">
		{#if allIndexs.length}
			当前选定值位于所在列的索引值分别为：
			{#each allIndexs as index, i (i)}
				<span class="text-primary dark:text-dark mr-2">{index}</span>
			{/each}
		{:else}
			<div>请选定数据</div>
		{/if}
	</div>
	<Cell title="获取选定数据" onclick={() => (visible18 = true)} />
	<Picker
		bind:visible={visible18}
		datas={col3Datas}
		onconfirm={(items, indexs) => {
			allItems = items;
			allIndexs = indexs;
		}}
	/>

	<Cell title="顶部来点圆角" onclick={() => (visible19 = true)} />
	<Picker bind:visible={visible19} {datas} popup={{ radius: 'xl' }} />

	<Cell title="单列多选" onclick={() => (visible23 = true)} subTitle={multipleSelected1.length > 0 ? `已选 ${multipleSelected1.length} 项` : ''} />
	<Picker bind:visible={visible23} {datas} multiple bind:multipleSelected={multipleSelected1} />

	<Cell title="多列多选" onclick={() => (visible24 = true)} subTitle={multipleSelected2.length > 0 ? `已选 ${multipleSelected2.length} 项` : ''} />
	<Picker bind:visible={visible24} datas={col3Datas} multiple bind:multipleSelected={multipleSelected2} />

	<Cell title="联动多选" onclick={() => (visible25 = true)} subTitle={multipleSelected3.length > 0 ? `已选 ${multipleSelected3.length} 项` : ''} />
	<Picker bind:visible={visible25} datas={linkageData} isLinkage multiple bind:multipleSelected={multipleSelected3} />

	<div class="px-4 py-2">不使用弹出层</div>
	<Picker popup={null} {datas} height={30} />
</div>

<!-- data.js -->
<!--
const someProvinceList = [
    { label: '云南' },
    { label: '北京' },
    { label: '广东' },
    { label: '重庆' },
    { label: '四川' },
    { label: '湖北' },
    { label: '河南' },
    { label: '湖南' },
    { label: '山东' },
    { label: '江苏' },
    { label: '浙江' },
    { label: '江西' },
    { label: '安徽' },
    { label: '福建' },
];
const weekList = [
    { label: '星期一' },
    { label: '星期二' },
    { label: '星期三' },
    { label: '星期四' },
    { label: '星期五' },
    { label: '星期六' },
    { label: '星期日' },
];
const amOrPmList = [{ label: '上午' }, { label: '下午' }];
const timeList = [
    { label: '01:00' },
    { label: '02:00' },
    { label: '03:00' },
    { label: '04:00' },
    { label: '05:00' },
    { label: '06:00' },
    { label: '07:00' },
    { label: '08:00' },
    { label: '09:00' },
    { label: '10:00' },
    { label: '11:00' },
    { label: '12:00' },
];
const cityList = [
    { cityName: '昆明' },
    { cityName: '曲靖' },
    { cityName: '玉溪' },
    { cityName: '保山' },
    { cityName: '昭通' },
    { cityName: '丽江' },
    { cityName: '普洱' },
    { cityName: '临沧' },
    { cityName: '楚雄' },
    { cityName: '红河' },
    { cityName: '文山' },
];
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
const linkagDiffLabelKeyData = [
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
                ],
            },
        ],
    },
    {
        province: '贵州',
        children: [
            {
                city: '贵阳',
                children: [
                    { region: '南明区' },
                    { region: '云岩区' },
                    { region: '花溪区' },
                    { region: '乌当区' },
                    { region: '白云区' },
                    { region: '观山湖区' },
                ],
            },
            {
                city: '遵义',
                children: [
                    { region: '红花岗区' },
                    { region: '汇川区' },
                    { region: '播州区' },
                    { region: '桐梓县' },
                    { region: '绥阳县' },
                    { region: '正安县' },
                ],
            },
            {
                city: '六盘水',
                children: [{ region: '钟山区' }, { region: '六枝特区' }, { region: '水城县' }, { region: '盘县' }],
            },
        ],
    },
    {
        province: '四川',
        children: [
            {
                city: '成都',
                children: [
                    { region: '锦江区' },
                    { region: '青羊区' },
                    { region: '金牛区' },
                    { region: '武侯区' },
                    { region: '成华区' },
                    { region: '龙泉驿区' },
                ],
            },
            {
                city: '绵阳',
                children: [
                    { region: '涪城区' },
                    { region: '游仙区' },
                    { region: '安州区' },
                    { region: '三台县' },
                    { region: '盐亭县' },
                    { region: '梓潼县' },
                ],
            },
            {
                city: '攀枝花',
                children: [{ region: '东区' }, { region: '西区' }, { region: '仁和区' }, { region: '米易县' }, { region: '盐边县' }],
            },
        ],
    },
    {
        province: '北京',
        children: [
            {
                city: '北京',
                children: [
                    { region: '东城区' },
                    { region: '西城区' },
                    { region: '朝阳区' },
                    { region: '丰台区' },
                    { region: '石景山区' },
                    { region: '海淀区' },
                ],
            },
        ],
    },
];
const linkagCustomChildrenKeyData = [
    {
        label: '云南',
        child: [
            {
                label: '昆明',
                child: [
                    { label: '盘龙区' },
                    { label: '五华区' },
                    { label: '官渡区' },
                    { label: '西山区' },
                    { label: '东川区' },
                    { label: '呈贡区' },
                    { label: '晋宁区' },
                ],
            },
            {
                label: '曲靖',
                child: [
                    { label: '麒麟区' },
                    { label: '沾益区' },
                    { label: '马龙县' },
                    { label: '陆良县' },
                    { label: '师宗县' },
                    { label: '罗平县' },
                ],
            },
            {
                label: '玉溪',
                child: [
                    { label: '红塔区' },
                    { label: '江川区' },
                    { label: '澄江县' },
                    { label: '通海县' },
                    { label: '华宁县' },
                    { label: '易门县' },
                ],
            },
        ],
    },
    {
        label: '贵州',
        child: [
            {
                label: '贵阳',
                child: [
                    { label: '南明区' },
                    { label: '云岩区' },
                    { label: '花溪区' },
                    { label: '乌当区' },
                    { label: '白云区' },
                    { label: '观山湖区' },
                ],
            },
            {
                label: '遵义',
                child: [
                    { label: '红花岗区' },
                    { label: '汇川区' },
                    { label: '播州区' },
                    { label: '桐梓县' },
                    { label: '绥阳县' },
                    { label: '正安县' },
                ],
            },
            {
                label: '六盘水',
                child: [{ label: '钟山区' }, { label: '六枝特区' }, { label: '水城县' }, { label: '盘县' }],
            },
        ],
    },
    {
        label: '四川',
        child: [
            {
                label: '成都',
                child: [
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
                child: [
                    { label: '涪城区' },
                    { label: '游仙区' },
                    { label: '安州区' },
                    { label: '三台县' },
                    { label: '盐亭县' },
                    { label: '梓潼县' },
                ],
            },
            {
                label: '攀枝花',
                child: [{ label: '东区' }, { label: '西区' }, { label: '仁和区' }, { label: '米易县' }, { label: '盐边县' }],
            },
        ],
    },
    {
        label: '北京',
        child: [
            {
                label: '北京',
                child: [
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
        child: [
            {
                label: '杭州',
                child: [
                    { label: '西湖区' },
                    { label: '上城区' },
                    { label: '下城区' },
                    { label: '江干区' },
                    { label: '拱墅区' },
                    { label: '滨江区' },
                ],
            },
            {
                label: '宁波',
                child: [
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
                child: [
                    { label: '鹿城区' },
                    { label: '龙湾区' },
                    { label: '瓯海区' },
                    { label: '洞头区' },
                    { label: '永嘉县' },
                    { label: '平阳县' },
                ],
            },
        ],
    },
];

export { someProvinceList, weekList, amOrPmList, timeList, cityList, linkageData, linkagDiffLabelKeyData, linkagCustomChildrenKeyData };
-->
