<script setup lang="ts">
import { computed, ref } from 'vue';
import { appState } from '../store/appStore';

const isZh = computed(() => appState.lang === 'zh_CN');

const showWeChatPay = ref(false);
const showAlipayPay = ref(false);

// 判断是否是桌面设备
const isDeskDevice = window.innerWidth >= 768;
</script>

<template>
	<div
		class="animate-cmdk-fade fixed left-0 top-0 flex h-screen w-screen flex-col justify-center bg-black/20 backdrop-blur"
		style="z-index: 1000"
		@click="appState.isShowFund = false"
	>
		<div class="mx-4 rounded-xl bg-white p-4 shadow-lg md:mx-auto md:w-200 md:p-8 dark:bg-gray-950" @click.stop>
			<div class="flex justify-between">
				<div class="text-xl font-bold">{{ isZh ? '支持' : 'Support' }}</div>
				<div class="h-8">
					<a href="https://github.com/any-tdf/any-tdf" target="_blank">
						<img src="https://img.shields.io/github/stars/any-tdf/any-tdf?logo=github&label=stars&color=000" alt="GitHub" />
					</a>
				</div>
			</div>
			<div v-if="isDeskDevice || (!showWeChatPay && !showAlipayPay)" class="mt-2 text-xs text-gray-500 md:mt-8">
				<p>
					{{
						isZh
							? 'VTDF 是一个免费、开源、简单易用且精心打造的组件库。我们在组件设计开发、工具配套、文档建设等方面倾注了大量心血。如果 VTDF 为您带来了便利，希望您能给个 star 或打赏以示支持，感谢您的厚爱！'
							: 'VTDF is a free, open-source, easy-to-use, and carefully crafted component library. We have devoted tremendous effort to component design, development tools, and documentation. If VTDF has helped you, please consider showing your support with a star or donation. Thank you for your love!'
					}}
				</p>
				<p class="text-md mt-2 font-bold">
					{{ isZh ? '无论如何，VTDF 都将怀着热爱继续前行！' : 'No matter what, VTDF will keep moving forward with love!' }}
				</p>
			</div>
			<div
				class="grid mt-4 gap-2 text-center md:mt-10 md:grid-cols-4"
				:class="showWeChatPay || showAlipayPay ? 'grid-cols-1' : 'grid-cols-2'"
			>
				<!-- coffee -->
				<div
					v-if="isDeskDevice || (!showWeChatPay && !showAlipayPay)"
					class="group flex w-full flex-col justify-center rounded-lg border border-black/10 py-1 md:relative md:w-40 md:py-12 dark:border-white/10"
				>
					<div class="mx-auto h-8 w-6">
						<img class="h-full w-full object-cover" src="/assets/fund/coffee.svg" alt="coffee" />
					</div>
					<a class="mx-2 block md:hidden" href="https://www.buymeacoffee.com/dufu1991" target="_blank">
						<div class="text-center font-bold after:content-['_↗']">Buy Me a Coffee</div>
						<div class="mt-1 text-xs text-gray-500">
							{{ isZh ? '推荐非中国地区使用' : 'Recommended for Non-China Regions' }}
						</div>
					</a>
					<a
						class="absolute inset-1 hidden h-[95%] w-[95%] bg-white px-1 py-12 opacity-0 transition-all duration-500 group-hover:opacity-95 md:block dark:bg-gray-950"
						href="https://www.buymeacoffee.com/dufu1991"
						target="_blank"
					>
						<div class="text-center font-bold after:content-['_↗']">Buy Me a Coffee</div>
						<div class="mt-1 text-xs text-gray-500">
							{{ isZh ? '推荐非中国地区使用' : 'Recommended for Non-China Regions' }}
						</div>
					</a>
				</div>
				<!-- paypal -->
				<div
					v-if="isDeskDevice || (!showWeChatPay && !showAlipayPay)"
					class="group flex w-full flex-col justify-center rounded-lg border border-black/10 py-1 md:relative md:w-40 md:py-12 dark:border-white/10"
				>
					<div class="mx-auto h-8 w-8">
						<img class="h-full w-full object-cover" src="/assets/fund/paypal.svg" alt="paypal" />
					</div>
					<a class="mx-2 block md:hidden" href="https://paypal.me/dufu1991" target="_blank">
						<div class="text-center font-bold after:content-['_↗']">PayPal</div>
						<div class="mt-1 text-xs text-gray-500">
							{{ isZh ? '推荐非中国地区使用' : 'Recommended for Non-China Regions' }}
						</div>
					</a>
					<a
						class="absolute inset-1 hidden h-[95%] w-[95%] bg-white px-1 py-12 opacity-0 transition-all duration-500 group-hover:opacity-95 md:block dark:bg-gray-950"
						href="https://paypal.me/dufu1991"
						target="_blank"
					>
						<div class="text-center font-bold after:content-['_↗']">PayPal</div>
						<div class="mt-1 text-xs text-gray-500">
							{{ isZh ? '推荐非中国地区使用' : 'Recommended for Non-China Regions' }}
						</div>
					</a>
				</div>
				<!-- wechat -->
				<div
					v-if="isDeskDevice || !showAlipayPay"
					class="group flex w-full flex-col justify-center rounded-lg border border-black/10 py-1 md:relative md:w-40 md:py-12 dark:border-white/10"
				>
					<div class="mx-auto h-8 w-10" :class="{ hidden: showWeChatPay }">
						<img class="h-full w-full object-cover" src="/assets/fund/wechat_pay.svg" alt="wechat" />
					</div>
					<div class="mx-2 block md:hidden" @click="showWeChatPay = !showWeChatPay">
						<template v-if="showWeChatPay">
							<div class="mt-1">
								<img class="mx-auto w-3/5 object-cover" src="/assets/fund/wp_code.png" alt="wechat" />
							</div>
							<div class="mt-1 text-xs text-gray-500">
								{{ isZh ? '微信扫一扫' : 'WeChat Scan' }}
							</div>
						</template>
						<template v-else>
							<div class="text-center font-bold after:content-['_↗']">
								{{ isZh ? '微信赞赏' : 'WeChat Reward' }}
							</div>
							<div class="mt-1 text-xs text-gray-500">
								{{ isZh ? '推荐中国地区使用' : 'Recommended for China Regions' }}
							</div>
						</template>
					</div>
					<button
						class="absolute inset-1 hidden h-[95%] w-[95%] cursor-pointer bg-white px-1 opacity-0 transition-all duration-500 group-hover:opacity-95 md:block dark:bg-gray-950"
						:class="{ 'opacity-95!': showWeChatPay }"
						type="button"
						@click="showWeChatPay = !showWeChatPay"
					>
						<template v-if="showWeChatPay">
							<div class="mt-0.5">
								<img class="mx-auto w-[70%] object-cover" src="/assets/fund/wp_code.png" alt="wechat" />
							</div>
							<div class="mt-0.5 text-xs text-gray-500">
								{{ isZh ? '微信扫一扫' : 'WeChat Scan' }}
							</div>
						</template>
						<template v-else>
							<div class="mt-12 text-center font-bold after:content-['_↗']">
								{{ isZh ? '微信赞赏' : 'WeChat Reward' }}
							</div>
							<div class="mt-1 text-xs text-gray-500">
								{{ isZh ? '推荐中国地区使用' : 'Recommended for China Regions' }}
							</div>
						</template>
					</button>
				</div>
				<!-- alipay -->
				<div
					v-if="isDeskDevice || !showWeChatPay"
					class="group mx-auto flex w-full flex-col justify-center rounded-lg border border-black/10 py-1 md:relative md:w-40 md:py-12 dark:border-white/10"
				>
					<div class="mx-auto h-8 w-8" :class="{ hidden: showAlipayPay }">
						<img class="h-full w-full object-cover" src="/assets/fund/alipay.svg" alt="alipay" />
					</div>
					<div class="mx-2 block md:hidden" @click="showAlipayPay = !showAlipayPay">
						<template v-if="showAlipayPay">
							<div class="m-1">
								<img class="mx-auto w-3/5 object-cover" src="/assets/fund/ap_code.png" alt="alipay" />
							</div>
							<div class="mt-1 text-xs text-gray-500">
								{{ isZh ? '支付宝扫一扫' : 'Alipay Scan' }}
							</div>
						</template>
						<template v-else>
							<div class="text-center font-bold after:content-['_↗']">
								{{ isZh ? '支付宝收款' : 'Alipay Payment' }}
							</div>
							<div class="mt-1 text-xs text-gray-500">
								{{ isZh ? '推荐中国地区使用' : 'Recommended for China Regions' }}
							</div>
						</template>
					</div>
					<button
						class="absolute inset-1 hidden h-[95%] w-[95%] cursor-pointer bg-white px-1 opacity-0 transition-all duration-500 group-hover:opacity-95 md:block dark:bg-gray-950"
						:class="{ 'opacity-95!': showAlipayPay }"
						type="button"
						@click="showAlipayPay = !showAlipayPay"
					>
						<template v-if="showAlipayPay">
							<div class="mt-0.5">
								<img class="mx-auto w-[70%] object-cover" src="/assets/fund/ap_code.png" alt="wechat" />
							</div>
							<div class="mt-0.5 text-xs text-gray-500">
								{{ isZh ? '支付宝扫一扫' : 'Alipay Scan' }}
							</div>
						</template>
						<template v-else>
							<div class="mt-12 text-center font-bold after:content-['_↗']">
								{{ isZh ? '支付宝收款' : 'Alipay Payment' }}
							</div>
							<div class="mt-1 text-xs text-gray-500">
								{{ isZh ? '推荐中国地区使用' : 'Recommended for China Regions' }}
							</div>
						</template>
					</button>
				</div>
			</div>
			<div class="mt-4 text-xs text-gray-500 md:mt-8">
				{{
					isZh
						? '欢迎在捐赠留言中附上您的 GitHub 或其他社交账号链接，VTDF 将在项目仓库和官网中展示感谢！'
						: 'Feel free to include your GitHub or other social media links in the donation message. VTDF will gratefully acknowledge your support on our repository and website!'
				}}
			</div>
		</div>
	</div>
</template>
