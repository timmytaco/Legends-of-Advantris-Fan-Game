using UnityEngine;

public class BotwClimbingController : MonoBehaviour
{
    [Header("Climbing Settings")]
    public float climbSpeed = 3f;
    public float climbCheckDistance = 0.5f;
    public float sphereRadius = 0.3f;
    public LayerMask climbableLayers;
    public float staminaMax = 100f;
    public float staminaClimbDrain = 10f;
    
    [Header("Dependencies")]
    public CharacterController characterController;
    
    private float currentStamina;
    private bool isClimbing = false;
    private Vector3 wallNormal;

    void Start()
    {
        currentStamina = staminaMax;
        if (characterController == null)
            characterController = GetComponent<CharacterController>();
    }

    void Update()
    {
        CheckForWall();
        
        if (isClimbing)
        {
            HandleClimbingMovement();
        }
    }

    void CheckForWall()
    {
        RaycastHit hit;
        Vector3 checkDirection = transform.forward;
        
        // Spherecast to check for wall in front of player
        if (Physics.SphereCast(transform.position, sphereRadius, checkDirection, out hit, climbCheckDistance, climbableLayers))
        {
            // Enter climbing state on wall contact + jump button hold
            if (!isClimbing && Input.GetButton("Jump") && currentStamina > 0)
            {
                StartClimbing(hit);
            }
        }
        else if (isClimbing)
        {
            StopClimbing();
        }
    }

    void StartClimbing(RaycastHit hit)
    {
        isClimbing = true;
        wallNormal = hit.normal;
        // Rotate player to face the wall face
        transform.rotation = Quaternion.LookRotation(-wallNormal);
    }

    void StopClimbing()
    {
        isClimbing = false;
    }

    void HandleClimbingMovement()
    {
        float horizontalInput = Input.GetAxis("Horizontal");
        float verticalInput = Input.GetAxis("Vertical");
        
        // Move along the wall face plane
        Vector3 climbDirection = transform.up * verticalInput + transform.right * horizontalInput;
        
        if (climbDirection.magnitude > 0.1f)
        {
            characterController.Move(climbDirection * climbSpeed * Time.deltaTime);
            currentStamina -= staminaClimbDrain * Time.deltaTime;
        }
        
        // Slow constant stamina drain while holding onto the wall
        currentStamina -= (staminaClimbDrain * 0.2f) * Time.deltaTime;
        
        if (currentStamina <= 0)
        {
            currentStamina = 0;
            StopClimbing();
        }
    }

    public float GetStaminaNormalized()
    {
        return currentStamina / staminaMax;
    }

    public void RestoreStamina(float amount)
    {
        currentStamina = Mathf.Min(staminaMax, currentStamina + amount);
    }
}
