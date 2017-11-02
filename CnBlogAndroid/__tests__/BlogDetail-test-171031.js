//__tests__/BlogDetail-test-171031.js
import 'react-native';
import React from 'react';
import BD from '../Source/screens/BlogDetail';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
it('renders correctly', () => {
	const tree = renderer.create(
		<BD />
	).toJSON();
	expect(tree).toMatchSnapshot();
});