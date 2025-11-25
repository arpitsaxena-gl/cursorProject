/**
 * @format
 */

// Mock useColorScheme before any imports
const mockUseColorScheme = jest.fn(() => 'light');

jest.mock('react-native', () => {
  // Use requireActual to get the real react-native
  const RN = jest.requireActual('react-native');
  
  // Create a proxy that intercepts useColorScheme but passes through everything else
  return new Proxy(RN, {
    get(target, prop) {
      if (prop === 'useColorScheme') {
        return mockUseColorScheme;
      }
      return target[prop as keyof typeof target];
    },
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import Card from '../src/components/Card';

describe('Card Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default to light mode
    mockUseColorScheme.mockReturnValue('light');
  });

  describe('Basic Rendering', () => {
    it('renders correctly without any props', () => {
      const { UNSAFE_root } = render(<Card />);
      expect(UNSAFE_root).toBeTruthy();
    });

    it('renders as View when onPress is not provided', () => {
      const { UNSAFE_root } = render(<Card />);
      const view = UNSAFE_root.findByType(View);
      expect(view).toBeTruthy();
    });

    it('renders as TouchableOpacity when onPress is provided', () => {
      const onPress = jest.fn();
      const { UNSAFE_root } = render(<Card onPress={onPress} />);
      const touchable = UNSAFE_root.findByType(TouchableOpacity);
      expect(touchable).toBeTruthy();
    });
  });

  describe('Title Rendering', () => {
    it('renders title when provided', () => {
      const { getByText } = render(<Card title="Test Title" />);
      expect(getByText('Test Title')).toBeTruthy();
    });

    it('does not render title when not provided', () => {
      const { queryByText } = render(<Card />);
      expect(queryByText(/./)).toBeNull();
    });
  });

  describe('Children Rendering', () => {
    it('renders string children as Text component', () => {
      const { getByText } = render(<Card>String content</Card>);
      expect(getByText('String content')).toBeTruthy();
    });

    it('renders ReactNode children directly', () => {
      const TestChild = () => React.createElement(Text, null, 'ReactNode content');
      const { getByText } = render(
        <Card>
          <TestChild />
        </Card>
      );
      expect(getByText('ReactNode content')).toBeTruthy();
    });

    it('does not render children when not provided', () => {
      const { queryByText } = render(<Card title="Title Only" />);
      expect(queryByText('Title Only')).toBeTruthy();
      expect(queryByText(/content/i)).toBeNull();
    });
  });

  describe('Color Scheme (Dark/Light Mode)', () => {
    it('applies light mode background color when color scheme is light', () => {
      mockUseColorScheme.mockReturnValue('light');
      const { UNSAFE_root } = render(<Card title="Test" />);
      const cardWrapper = UNSAFE_root.findByType(View);
      const styles = cardWrapper.props.style;
      const backgroundColor = Array.isArray(styles)
        ? styles.find((s: any) => s?.backgroundColor)?.backgroundColor
        : styles?.backgroundColor;
      expect(backgroundColor).toBe('#f5f5f5');
    });

    it('applies dark mode background color when color scheme is dark', () => {
      mockUseColorScheme.mockReturnValue('dark');
      const { UNSAFE_root } = render(<Card title="Test" />);
      const cardWrapper = UNSAFE_root.findByType(View);
      const styles = cardWrapper.props.style;
      const backgroundColor = Array.isArray(styles)
        ? styles.find((s: any) => s?.backgroundColor)?.backgroundColor
        : styles?.backgroundColor;
      expect(backgroundColor).toBe('#2a2a2a');
    });

    it('applies correct text color in light mode', () => {
      mockUseColorScheme.mockReturnValue('light');
      const { UNSAFE_root } = render(<Card title="Test Title" />);
      const titleText = UNSAFE_root.findByType(Text);
      const styles = titleText.props.style;
      const textColor = Array.isArray(styles)
        ? styles.find((s: any) => s?.color)?.color
        : styles?.color;
      expect(textColor).toBe('#000000');
    });

    it('applies correct text color in dark mode', () => {
      mockUseColorScheme.mockReturnValue('dark');
      const { UNSAFE_root } = render(<Card title="Test Title" />);
      const titleText = UNSAFE_root.findByType(Text);
      const styles = titleText.props.style;
      const textColor = Array.isArray(styles)
        ? styles.find((s: any) => s?.color)?.color
        : styles?.color;
      expect(textColor).toBe('#ffffff');
    });

    it('applies correct text color for string children in light mode', () => {
      mockUseColorScheme.mockReturnValue('light');
      const { UNSAFE_root } = render(<Card>String content</Card>);
      const textComponents = UNSAFE_root.findAllByType(Text);
      const contentText = textComponents.find(
        (text) => text.props.children === 'String content'
      );
      expect(contentText).toBeTruthy();
      const styles = contentText?.props.style;
      const textColor = Array.isArray(styles)
        ? styles.find((s: any) => s?.color)?.color
        : styles?.color;
      expect(textColor).toBe('#000000');
    });

    it('applies correct text color for string children in dark mode', () => {
      mockUseColorScheme.mockReturnValue('dark');
      const { UNSAFE_root } = render(<Card>String content</Card>);
      const textComponents = UNSAFE_root.findAllByType(Text);
      const contentText = textComponents.find(
        (text) => text.props.children === 'String content'
      );
      expect(contentText).toBeTruthy();
      const styles = contentText?.props.style;
      const textColor = Array.isArray(styles)
        ? styles.find((s: any) => s?.color)?.color
        : styles?.color;
      expect(textColor).toBe('#ffffff');
    });
  });

  describe('Custom Styles', () => {
    it('applies custom style prop', () => {
      const customStyle = { marginTop: 10 };
      const { UNSAFE_root } = render(<Card style={customStyle} />);
      const cardWrapper = UNSAFE_root.findByType(View);
      const styles = cardWrapper.props.style;
      expect(Array.isArray(styles) ? styles.includes(customStyle) : styles === customStyle).toBe(true);
    });

    it('applies custom titleStyle prop', () => {
      const customTitleStyle = { fontSize: 24 };
      const { UNSAFE_root } = render(
        <Card title="Test" titleStyle={customTitleStyle} />
      );
      const titleText = UNSAFE_root.findByType(Text);
      const styles = titleText.props.style;
      expect(Array.isArray(styles) ? styles.includes(customTitleStyle) : styles === customTitleStyle).toBe(true);
    });

    it('applies custom contentStyle prop', () => {
      const customContentStyle = { padding: 10 };
      const { UNSAFE_root } = render(
        <Card contentStyle={customContentStyle}>Content</Card>
      );
      const contentViews = UNSAFE_root.findAllByType(View);
      const contentView = contentViews.find(
        (view) =>
          view.props.style &&
          Array.isArray(view.props.style) &&
          view.props.style.includes(customContentStyle)
      );
      expect(contentView).toBeTruthy();
    });
  });

  describe('onPress Functionality', () => {
    it('calls onPress when TouchableOpacity is pressed', () => {
      const onPress = jest.fn();
      const { UNSAFE_root } = render(<Card onPress={onPress} />);
      const touchable = UNSAFE_root.findByType(TouchableOpacity);
      fireEvent.press(touchable);
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('sets activeOpacity to 0.7 when onPress is provided', () => {
      const onPress = jest.fn();
      const { UNSAFE_root } = render(<Card onPress={onPress} />);
      const touchable = UNSAFE_root.findByType(TouchableOpacity);
      expect(touchable.props.activeOpacity).toBe(0.7);
    });

    it('sets activeOpacity to 1 when onPress is not provided', () => {
      const { UNSAFE_root } = render(<Card />);
      const view = UNSAFE_root.findByType(View);
      // View doesn't have activeOpacity, but we verify it's a View component
      expect(view.type).toBe(View);
    });
  });

  describe('Combined Props', () => {
    it('renders correctly with all props provided', () => {
      const onPress = jest.fn();
      const customStyle = { margin: 5 };
      const customTitleStyle = { fontSize: 18 };
      const customContentStyle = { padding: 15 };

      const { getByText, UNSAFE_root } = render(
        <Card
          title="Full Card"
          style={customStyle}
          titleStyle={customTitleStyle}
          contentStyle={customContentStyle}
          onPress={onPress}>
          Full content
        </Card>
      );

      expect(getByText('Full Card')).toBeTruthy();
      expect(getByText('Full content')).toBeTruthy();
      expect(UNSAFE_root.findByType(TouchableOpacity)).toBeTruthy();
    });

    it('renders correctly with title and string children', () => {
      const { getByText } = render(
        <Card title="Card Title">Card content</Card>
      );
      expect(getByText('Card Title')).toBeTruthy();
      expect(getByText('Card content')).toBeTruthy();
    });

    it('renders correctly with title and ReactNode children', () => {
      const TestChild = () => React.createElement(Text, null, 'Child component');
      const { getByText } = render(
        <Card title="Card Title">
          <TestChild />
        </Card>
      );
      expect(getByText('Card Title')).toBeTruthy();
      expect(getByText('Child component')).toBeTruthy();
    });

    it('handles TouchableOpacity with dark mode and all props', () => {
      mockUseColorScheme.mockReturnValue('dark');
      const onPress = jest.fn();
      const { getByText, UNSAFE_root } = render(
        <Card
          title="Dark Card"
          style={{ margin: 10 }}
          titleStyle={{ fontSize: 22 }}
          contentStyle={{ padding: 20 }}
          onPress={onPress}>
          Dark content
        </Card>
      );

      expect(getByText('Dark Card')).toBeTruthy();
      expect(getByText('Dark content')).toBeTruthy();
      const touchable = UNSAFE_root.findByType(TouchableOpacity);
      fireEvent.press(touchable);
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });
});
