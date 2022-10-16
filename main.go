import (
	"github.com/sonr-io/sonr/pkg/motor"
	"github.com/sonr-io/sonr/third_party/types/common"
)

func main() {
	mtr, err := EmptyMotor(&mt.InitializeRequest{
		DeviceId: "unique_device_id", // this field must be unique to the device
	}, common.DefaultCallback())
}