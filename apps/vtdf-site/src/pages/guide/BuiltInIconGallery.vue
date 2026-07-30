<script setup lang="ts">
import {
	builtInIconGalleryList,
	builtInIconLibraryLabelMap,
	builtInIconLibraryList,
	getSvgRenderableNodes,
	resolveBuiltInSvg,
	resolveSvgNodeKey,
	resolveSvgRootAttrs,
	type BuiltInIconLibrary,
	type SvgRenderableNodeData,
	type SvgRootAttrs
} from '@any-tdf/common/svg';

type GalleryIcon = {
	rootAttrs: SvgRootAttrs;
	nodes: readonly SvgRenderableNodeData[];
};

type GalleryRow = {
	key: string;
	icons: Record<BuiltInIconLibrary, GalleryIcon>;
};

const createGalleryIcon = (key: string, library: BuiltInIconLibrary): GalleryIcon => {
	const svg = resolveBuiltInSvg(key, library);
	return {
		rootAttrs: resolveSvgRootAttrs({ svg }),
		nodes: getSvgRenderableNodes(svg)
	};
};

const createGalleryIcons = (key: string): Record<BuiltInIconLibrary, GalleryIcon> =>
	Object.fromEntries(builtInIconLibraryList.map((library) => [library, createGalleryIcon(key, library)])) as Record<
		BuiltInIconLibrary,
		GalleryIcon
	>;

const iconRows: readonly GalleryRow[] = builtInIconGalleryList.map((item) => ({
	key: item.key,
	icons: createGalleryIcons(item.key)
}));
</script>

<template>
	<div class="not-prose my-6 overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
		<table class="w-full min-w-max border-collapse text-left text-sm">
			<thead class="bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
				<tr>
					<th class="px-4 py-3 font-semibold">Key</th>
					<th v-for="library in builtInIconLibraryList" :key="library" class="px-4 py-3 text-center font-semibold">
						{{ builtInIconLibraryLabelMap[library] }}
					</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 dark:divide-gray-800">
				<tr v-for="item in iconRows" :key="item.key">
					<td class="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-700 dark:text-gray-200">{{ item.key }}</td>
					<td v-for="library in builtInIconLibraryList" :key="library" class="px-4 py-3">
						<div class="flex items-center justify-center text-gray-900 dark:text-gray-100">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-8"
								:viewBox="item.icons[library].rootAttrs.viewBox"
								:fill="item.icons[library].rootAttrs.fill"
								:stroke="item.icons[library].rootAttrs.stroke"
								:stroke-width="item.icons[library].rootAttrs.strokeWidth"
								aria-hidden="true"
							>
								<template v-for="(node, index) in item.icons[library].nodes" :key="resolveSvgNodeKey(node, index)">
									<path
										v-if="node.type === 'path'"
										:d="node.d"
										:class="node.className"
										:fill="node.fill"
										:stroke="node.stroke"
										:stroke-width="node.strokeWidth"
										:stroke-linecap="node.strokeLinecap"
										:stroke-linejoin="node.strokeLinejoin"
										:stroke-dasharray="node.strokeDasharray"
										:stroke-dashoffset="node.strokeDashoffset"
										:pathLength="node.pathLength"
										:fill-rule="node.fillRule"
										:clip-rule="node.clipRule"
										:opacity="node.opacity"
									/>
									<circle
										v-else-if="node.type === 'circle'"
										:cx="node.cx"
										:cy="node.cy"
										:r="node.r"
										:class="node.className"
										:fill="node.fill"
										:stroke="node.stroke"
										:stroke-width="node.strokeWidth"
										:stroke-dasharray="node.strokeDasharray"
										:stroke-dashoffset="node.strokeDashoffset"
										:pathLength="node.pathLength"
										:opacity="node.opacity"
									/>
									<rect
										v-else-if="node.type === 'rect'"
										:x="node.x"
										:y="node.y"
										:width="node.width"
										:height="node.height"
										:rx="node.rx"
										:ry="node.ry"
										:class="node.className"
										:fill="node.fill"
										:stroke="node.stroke"
										:stroke-width="node.strokeWidth"
										:stroke-dasharray="node.strokeDasharray"
										:stroke-dashoffset="node.strokeDashoffset"
										:pathLength="node.pathLength"
										:opacity="node.opacity"
									/>
									<line
										v-else-if="node.type === 'line'"
										:x1="node.x1"
										:y1="node.y1"
										:x2="node.x2"
										:y2="node.y2"
										:class="node.className"
										:stroke="node.stroke"
										:stroke-width="node.strokeWidth"
										:stroke-linecap="node.strokeLinecap"
										:opacity="node.opacity"
									/>
									<polyline
										v-else-if="node.type === 'polyline'"
										:points="node.points"
										:class="node.className"
										:fill="node.fill"
										:stroke="node.stroke"
										:stroke-width="node.strokeWidth"
										:stroke-linecap="node.strokeLinecap"
										:stroke-linejoin="node.strokeLinejoin"
										:opacity="node.opacity"
									/>
									<polygon
										v-else-if="node.type === 'polygon'"
										:points="node.points"
										:class="node.className"
										:fill="node.fill"
										:stroke="node.stroke"
										:stroke-width="node.strokeWidth"
										:stroke-linejoin="node.strokeLinejoin"
										:opacity="node.opacity"
									/>
								</template>
							</svg>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
