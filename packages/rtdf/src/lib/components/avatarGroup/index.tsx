import type { AvatarGroupProps } from '../../types';
import Avatars from '../avatar/Avatars';

const AvatarGroup: React.FC<AvatarGroupProps> = (props) => {
	return <Avatars {...props} />;
};

export default AvatarGroup;
export type { AvatarGroupProps } from '../../types';
