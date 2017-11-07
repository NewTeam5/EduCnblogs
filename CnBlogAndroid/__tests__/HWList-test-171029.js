//__tests__/HWList-test-171029.js
import 'react-native';
import React from 'react';
import HWList from '../Source/screens/HomeworkLists';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
it('renders correctly', () => {
	const tree = renderer.create(
		<HWList />
	).toJSON();
	expect(tree).toMatchSnapshot();
});