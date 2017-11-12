//__tests__/HWUI-test-171029.js
import 'react-native';
import React from 'react';
import HWUI from '../Source/UI/HomeworkPage/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
it('renders correctly', () => {
	const tree = renderer.create(
		<HWUI />
	).toJSON();
	expect(tree).toMatchSnapshot();
});

