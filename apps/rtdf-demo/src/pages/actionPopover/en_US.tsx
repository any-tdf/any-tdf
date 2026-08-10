import { useRef, useState } from 'react';
import { ActionPopover, Button } from 'rtdf/components';
import type { ActionProps, RingActionProps } from 'rtdf/types';

const ActionPopoverEn = () => {
	const [visible1, setVisible1] = useState(false);
	const [visible2, setVisible2] = useState(false);
	const [visible3, setVisible3] = useState(false);
	const [visible4, setVisible4] = useState(false);
	const [visible5, setVisible5] = useState(false);
	const [visible6, setVisible6] = useState(false);
	const [visible7, setVisible7] = useState(false);
	const [visible8, setVisible8] = useState(false);
	const [visible9, setVisible9] = useState(false);
	const [visible10, setVisible10] = useState(false);
	const [visible11, setVisible11] = useState(false);
	const [visible12, setVisible12] = useState(false);
	const [visible13, setVisible13] = useState(false);
	const [visible14, setVisible14] = useState(false);

	const triggerRef1 = useRef<HTMLDivElement | null>(null);
	const triggerRef2 = useRef<HTMLDivElement | null>(null);
	const triggerRef3 = useRef<HTMLDivElement | null>(null);
	const triggerRef4 = useRef<HTMLDivElement | null>(null);
	const triggerRef5 = useRef<HTMLDivElement | null>(null);
	const triggerRef6 = useRef<HTMLDivElement | null>(null);
	const triggerRef7 = useRef<HTMLDivElement | null>(null);
	const triggerRef8 = useRef<HTMLDivElement | null>(null);
	const triggerRef9 = useRef<HTMLDivElement | null>(null);
	const triggerRef10 = useRef<HTMLDivElement | null>(null);
	const triggerRef11 = useRef<HTMLDivElement | null>(null);
	const triggerRef12 = useRef<HTMLDivElement | null>(null);
	const triggerRef13 = useRef<HTMLDivElement | null>(null);
	const triggerRef14 = useRef<HTMLDivElement | null>(null);

	const actions: ActionProps[] = [
		{ content: 'Edit' },
		{ content: 'Share', style: 'success', disabled: true },
		{ content: 'Delete', style: 'error' }
	];
	const actions2: ActionProps[] = [
		{ content: 'Copy Link' },
		{ content: 'Save Image' },
		{ content: 'Forward' },
		{ content: 'Report', style: 'warning' }
	];
	const actionsWithIcon: ActionProps[] = [
		{ content: 'Edit', icon: { name: 'ri-edit-line', size: 18 } },
		{ content: 'Share', style: 'theme', icon: { name: 'ri-share-forward-line', size: 18 } },
		{ content: 'Favorite', style: 'info', icon: { name: 'ri-star-line', size: 18 } },
		{ content: 'Delete', style: 'error', icon: { name: 'ri-delete-bin-line', size: 18, state: 'error' } }
	];
	const actionsWithIcon2: ActionProps[] = [
		{ content: 'Copy', icon: { name: 'ri-file-copy-line', size: 18 } },
		{ content: 'Cut', style: 'warning', icon: { name: 'ri-scissors-line', size: 18 } },
		{ content: 'Paste', icon: { name: 'ri-clipboard-line', size: 18 } }
	];
	const actionsGrid: ActionProps[] = [
		{ content: 'Edit', icon: { name: 'ri-edit-line', size: 18 } },
		{ content: 'Share', icon: { name: 'ri-share-forward-line', size: 18 } },
		{ content: 'Favorite', icon: { name: 'ri-star-line', size: 18 } },
		{ content: 'Copy', icon: { name: 'ri-file-copy-line', size: 18 } },
		{ content: 'Paste', icon: { name: 'ri-clipboard-line', size: 18 } },
		{ content: 'Delete', style: 'error', icon: { name: 'ri-delete-bin-line', size: 18, state: 'error' } }
	];

	const ringActions3: RingActionProps[] = [
		{ icon: { name: 'ri-edit-line', size: 20 } },
		{ icon: { name: 'ri-share-forward-line', size: 20 } },
		{ icon: { name: 'ri-star-line', size: 20 } }
	];
	const ringActions5: RingActionProps[] = [
		{ icon: { name: 'ri-edit-line', size: 20 } },
		{ icon: { name: 'ri-share-forward-line', size: 20 } },
		{ icon: { name: 'ri-star-line', size: 20 } },
		{ icon: { name: 'ri-file-copy-line', size: 20 } },
		{ icon: { name: 'ri-delete-bin-line', size: 20 }, style: 'error' }
	];
	const ringActions8: RingActionProps[] = [
		{ icon: { name: 'ri-edit-line', size: 20 } },
		{ icon: { name: 'ri-share-forward-line', size: 20 } },
		{ icon: { name: 'ri-star-line', size: 20 } },
		{ icon: { name: 'ri-file-copy-line', size: 20 } },
		{ icon: { name: 'ri-clipboard-line', size: 20 } },
		{ icon: { name: 'ri-heart-line', size: 20 }, style: 'error' },
		{ icon: { name: 'ri-thumb-up-line', size: 20 }, style: 'success' },
		{ icon: { name: 'ri-delete-bin-line', size: 20 }, style: 'warning' }
	];

	return (
		<div className="py-4">
			<div className="mx-4 text-lg font-bold">Basic usage</div>
			<div className="mx-4 mt-2 text-sm text-black/50 dark:text-white/50">
				ActionPopover appears near the trigger element and fits compact interaction scenarios.
			</div>

			<div className="mx-4 mt-4 flex items-center gap-4">
				<div ref={triggerRef1} className="inline-block">
					<Button size="sm" onClick={() => setVisible1(!visible1)} heightOut="0">
						More actions
					</Button>
				</div>
				<ActionPopover
					visible={visible1}
					triggerRef={triggerRef1}
					actions={actions}
					inlineAlign="left"
					onClose={() => setVisible1(false)}
				/>
			</div>

			<div className="mx-4 mt-4 flex items-center justify-center gap-4">
				<div ref={triggerRef2} className="inline-block">
					<Button size="sm" onClick={() => setVisible2(!visible2)} heightOut="0">
						Center
					</Button>
				</div>
				<ActionPopover
					visible={visible2}
					triggerRef={triggerRef2}
					actions={actions}
					inlineAlign="center"
					onClose={() => setVisible2(false)}
				/>
			</div>

			<div className="mx-4 mt-4 flex items-center justify-end gap-4">
				<div ref={triggerRef3} className="inline-block">
					<Button size="sm" onClick={() => setVisible3(!visible3)} heightOut="0">
						Right
					</Button>
				</div>
				<ActionPopover
					visible={visible3}
					triggerRef={triggerRef3}
					actions={actions}
					inlineAlign="right"
					onClose={() => setVisible3(false)}
				/>
			</div>

			<div className="mx-4 mt-8 text-sm font-bold">With title</div>
			<div className="mx-4 mt-4 flex items-center gap-4">
				<div ref={triggerRef4} className="inline-block">
					<Button size="sm" fill="lineState" onClick={() => setVisible4(!visible4)} heightOut="0">
						More
					</Button>
				</div>
				<ActionPopover
					visible={visible4}
					triggerRef={triggerRef4}
					actions={actions2}
					inlineAlign="left"
					title="Select action"
					onClose={() => setVisible4(false)}
				/>
			</div>

			<div className="mx-4 mt-8 text-sm font-bold">Pop upward</div>
			<div className="mx-4 mt-4 flex items-center gap-4">
				<div ref={triggerRef5} className="inline-block">
					<Button
						size="sm"
						fill="colorLight"
						onClick={() => setVisible5(!visible5)}
						heightOut="0"
						icon={{ name: 'ri-more-2-fill', size: 20 }}
					/>
				</div>
				<ActionPopover
					visible={visible5}
					triggerRef={triggerRef5}
					actions={actions}
					inlineAlign="left"
					inlineDirection="up"
					onClose={() => setVisible5(false)}
				/>
			</div>

			<div className="mx-4 mt-8 text-sm font-bold">With icons</div>
			<div className="mx-4 mt-4 flex items-center gap-4">
				<div ref={triggerRef6} className="inline-block">
					<Button size="sm" onClick={() => setVisible6(!visible6)} heightOut="0">
						Action menu
					</Button>
				</div>
				<ActionPopover
					visible={visible6}
					triggerRef={triggerRef6}
					actions={actionsWithIcon}
					inlineAlign="left"
					align="left"
					onClose={() => setVisible6(false)}
				/>
			</div>

			<div className="mx-4 mb-4 mt-4 flex items-center justify-end gap-4">
				<div ref={triggerRef7} className="inline-block">
					<Button size="sm" fill="lineLight" onClick={() => setVisible7(!visible7)} heightOut="0" icon={{ name: 'ri-more-line', size: 18 }}>
						Edit
					</Button>
				</div>
				<ActionPopover
					visible={visible7}
					triggerRef={triggerRef7}
					actions={actionsWithIcon2}
					inlineAlign="right"
					align="left"
					onClose={() => setVisible7(false)}
				/>
			</div>

			<div className="mx-4 mt-8 text-sm font-bold">Inverse colors</div>
			<div className="mx-4 mt-4 flex items-center gap-4">
				<div ref={triggerRef8} className="inline-block">
					<Button size="sm" fill="lineState" onClick={() => setVisible8(!visible8)} heightOut="0">
						Inverse
					</Button>
				</div>
				<ActionPopover
					visible={visible8}
					triggerRef={triggerRef8}
					actions={actions}
					inlineAlign="left"
					inverse
					onClose={() => setVisible8(false)}
				/>
			</div>

			<div className="mx-4 mt-8 text-sm font-bold">Horizontal layout</div>
			<div className="mx-4 mt-4 flex items-center gap-4">
				<div ref={triggerRef9} className="inline-block">
					<Button size="sm" onClick={() => setVisible9(!visible9)} heightOut="0">
						Horizontal
					</Button>
				</div>
				<ActionPopover
					visible={visible9}
					triggerRef={triggerRef9}
					actions={actionsWithIcon2}
					inlineAlign="left"
					layout="h"
					onClose={() => setVisible9(false)}
				/>
			</div>

			<div className="mx-4 mt-8 text-sm font-bold">Grid layout</div>
			<div className="mx-4 mb-4 mt-4 flex items-center gap-4">
				<div ref={triggerRef10} className="inline-block">
					<Button size="sm" fill="lineLight" onClick={() => setVisible10(!visible10)} heightOut="0">
						Grid actions
					</Button>
				</div>
				<ActionPopover
					visible={visible10}
					triggerRef={triggerRef10}
					actions={actionsGrid}
					inlineAlign="left"
					layout="grid"
					gridColumns={3}
					onClose={() => setVisible10(false)}
				/>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Ring Layout</div>
			<div className="mx-4 mt-2 text-sm text-black/50 dark:text-white/50">
				Ring layout automatically determines the expansion direction based on the trigger element's position, supporting quarter circle,
				half circle, and full circle.
			</div>

			<div className="mx-4 mt-4 text-sm font-bold">Auto detect (3 items → Quarter circle)</div>
			<div className="mx-4 mt-4 flex items-center gap-4">
				<div ref={triggerRef11} className="inline-block">
					<Button
						fill="base"
						onClick={() => setVisible11(!visible11)}
						customSize
						customWidth={44}
						customHeight={44}
						icon={{ name: 'ri-add-line', size: 20 }}
					/>
				</div>
				<ActionPopover
					visible={visible11}
					triggerRef={triggerRef11}
					actions={[]}
					layout="ring"
					ringActions={ringActions3}
					onClose={() => setVisible11(false)}
				/>
			</div>

			<div className="mx-4 mt-4 flex items-center justify-end gap-4">
				<div ref={triggerRef12} className="inline-block">
					<Button
						fill="base"
						onClick={() => setVisible12(!visible12)}
						customSize
						customWidth={44}
						customHeight={44}
						icon={{ name: 'ri-add-line', size: 20 }}
					/>
				</div>
				<ActionPopover
					visible={visible12}
					triggerRef={triggerRef12}
					actions={[]}
					layout="ring"
					ringActions={ringActions3}
					onClose={() => setVisible12(false)}
				/>
			</div>

			<div className="mx-4 mt-4 text-sm font-bold">Auto detect (5 items → Half circle)</div>
			<div className="mx-4 mt-4 flex items-center justify-center gap-4">
				<div ref={triggerRef13} className="inline-block">
					<Button
						fill="colorLight"
						onClick={() => setVisible13(!visible13)}
						customSize
						customWidth={44}
						customHeight={44}
						icon={{ name: 'ri-more-2-fill', size: 20 }}
					/>
				</div>
				<ActionPopover
					visible={visible13}
					triggerRef={triggerRef13}
					actions={[]}
					layout="ring"
					ringActions={ringActions5}
					onClose={() => setVisible13(false)}
				/>
			</div>

			<div className="mx-4 mt-4 text-sm font-bold">Full circle (8 items)</div>
			<div className="mx-4 mb-32 mt-4 flex items-center justify-center gap-4">
				<div ref={triggerRef14} className="inline-block">
					<Button
						fill="lineState"
						onClick={() => setVisible14(!visible14)}
						customSize
						customWidth={44}
						customHeight={44}
						icon={{ name: 'ri-apps-line', size: 20 }}
					/>
				</div>
				<ActionPopover
					visible={visible14}
					triggerRef={triggerRef14}
					actions={[]}
					layout="ring"
					ringActions={ringActions8}
					ringShape="full"
					onClose={() => setVisible14(false)}
				/>
			</div>
		</div>
	);
};

export default ActionPopoverEn;
