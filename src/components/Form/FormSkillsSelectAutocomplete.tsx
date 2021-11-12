import {
  useState,
  VoidFunctionComponent,
  MouseEventHandler,
  ComponentClass,
  useMemo,
  useEffect,
} from "react";
import Select, {
  components,
  MultiValueGenericProps,
  MultiValueProps,
  OnChangeValue,
  Props,
} from "react-select";
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortEndHandler,
  SortableHandle,
} from "react-sortable-hoc";
import { useSkillsContext } from "../../context/SkillsContext/SkillsContext";
import { ClassNames } from "@emotion/react";

// helpers
import { arrayMove } from "../../helpers";
import { SkillChip } from "../LivePreviewerComponents/SkillChip";

// interfaces
interface Skill {
  name: string;
  isActive?: boolean;
}

interface FormSkillsSelectPropsAutocomplete {
  label?: string;
  value: Skill[];
  onChange: (skills: Skill[]) => void;
}

interface SkillsOption {
  value: string;
  label: string;
  isActive?: boolean;
}

const SortableMultiValue = SortableElement(
  (props: MultiValueProps<SkillsOption>) => {
    const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const {
      data,
      cx,
      getStyles,
      isDisabled,
      className,
      selectProps,
      removeProps,
      children,
      ...rest
    } = props;
    const innerProps = { ...rest.innerProps, onMouseDown };
    const { Container, Label } = rest.components;
    return (
      <ClassNames>
        {({ css, cx: emotionCx }) => (
          <Container
            data={data}
            innerProps={{
              className: emotionCx(
                css(getStyles("multiValue", props)),
                cx(
                  {
                    "multi-value": true,
                    "multi-value--is-disabled": isDisabled,
                  },
                  className
                )
              ),
              ...innerProps,
            }}
            selectProps={selectProps}
          >
            <Label data={data} innerProps={{}} selectProps={selectProps}>
              <SkillChip
                label={data.label}
                {...rest}
                onDelete={removeProps.onClick}
                isActive={data.isActive}
              />
            </Label>
          </Container>
        )}
      </ClassNames>
    );
  }
);

const SortableMultiValueLabel = SortableHandle((props: MultiValueGenericProps) => {
  return <components.MultiValueLabel {...props} />;
});

const SortableSelect = SortableContainer(Select) as ComponentClass<
  Props<SkillsOption, true> & SortableContainerProps
>;

export const FormSkillsSelectAutocomplete: VoidFunctionComponent<FormSkillsSelectPropsAutocomplete> =
  ({ label, value, onChange: ch }) => {
    const { skillList } = useSkillsContext();
    const [selected, setSelected] = useState<readonly SkillsOption[]>([]);

    const onChange = (selectedOptions: OnChangeValue<SkillsOption, true>) => {
      ch(selectedOptions.map((skill) => ({ ...skill, name: skill.label })));
      setSelected(selectedOptions);
    };

    const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
      const newVal = arrayMove(selected, oldIndex, newIndex);
      ch(newVal.map((skill) => ({ name: skill.label })));
      setSelected(newVal);
    };

    const options = useMemo(() => {
      return skillList.map((skill) => ({
        value: skill,
        label: skill,
        isActive: true,
      }));
    }, [skillList]);

    useEffect(() => {
      if (value.length) {
        const selectedValues = value.map((skill) => ({
          ...skill,
          value: skill.name,
          label: skill.name,
        }));

        setSelected(selectedValues);
      }
    }, [value]);

    return (
      <div style={{ width: "100%" }}>
        <SortableSelect
          useDragHandle
          axis="xy"
          onSortEnd={onSortEnd}
          distance={4}
          getHelperDimensions={({ node }) => node.getBoundingClientRect()}
          isMulti
          options={options}
          value={selected}
          menuPosition="fixed"
          onChange={onChange}
          placeholder="Add a library, framework, skill..."
          components={{
            // * TS ignore from documentation
            // @ts-ignore
            MultiValue: SortableMultiValue,
            MultiValueLabel: SortableMultiValueLabel,
          }}
          closeMenuOnSelect={false}
        />
      </div>
    );
  };
